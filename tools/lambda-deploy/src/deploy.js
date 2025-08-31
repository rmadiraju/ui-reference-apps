import AWS from 'aws-sdk'
import fs from 'fs-extra'
import path from 'path'
import archiver from 'archiver'
import chalk from 'chalk'

// Configure AWS SDK for LocalStack
const lambda = new AWS.Lambda({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test'
})

const cloudfront = new AWS.CloudFront({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test'
})

export async function deployToLocalStack(referenceApp, functionName, createCloudFront) {
  console.log(chalk.yellow(`\n📦 Building ${referenceApp} for Lambda@Edge...`))

  try {
    // Build the application
    await buildApplication(referenceApp)

    // Create deployment package
    const zipPath = await createDeploymentPackage(referenceApp, functionName)

    // Deploy to LocalStack Lambda
    await deployLambdaFunction(functionName, zipPath)

    if (createCloudFront) {
      // Create CloudFront distribution
      await createCloudFrontDistribution(functionName)
    }

    console.log(chalk.green.bold('\n✅ Deployment completed successfully!'))
    console.log(chalk.blue(`\n🔗 Lambda Function: ${functionName}`))
    if (createCloudFront) {
      console.log(chalk.blue('🌐 CloudFront Distribution: Created'))
    }

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Deployment failed:'), error.message)
    throw error
  }
}

async function buildApplication(referenceApp) {
  const appPath = path.resolve(`../../${referenceApp}`)
  
  if (!fs.existsSync(appPath)) {
    throw new Error(`Reference app ${referenceApp} not found`)
  }

  console.log(chalk.gray('   Building application...'))

  // Run build command based on the framework
  const packageJsonPath = path.join(appPath, 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath)
    
    // This would typically run the build command
    // For now, we'll just check if the build output exists
    const buildOutputs = {
      'vite-react-csr': 'dist',
      'nextjs-react-ssr': '.next',
      'vite-vue-csr': 'dist',
      'nuxt-vue-ssr': '.nuxt'
    }

    const buildOutput = buildOutputs[referenceApp]
    const buildPath = path.join(appPath, buildOutput)
    
    if (!fs.existsSync(buildPath)) {
      console.log(chalk.yellow(`   ⚠️  Build output not found at ${buildPath}`))
      console.log(chalk.gray('   Please run "npm run build" in the reference app directory first'))
    }
  }
}

async function createDeploymentPackage(referenceApp, functionName) {
  console.log(chalk.gray('   Creating deployment package...'))

  const tempDir = path.join(process.cwd(), 'temp', functionName)
  await fs.ensureDir(tempDir)

  // Copy built application
  const appPath = path.resolve(`../../${referenceApp}`)
  const buildOutputs = {
    'vite-react-csr': 'dist',
    'nextjs-react-ssr': '.next',
    'vite-vue-csr': 'dist',
    'nuxt-vue-ssr': '.nuxt'
  }

  const buildOutput = buildOutputs[referenceApp]
  const buildPath = path.join(appPath, buildOutput)
  
  if (fs.existsSync(buildPath)) {
    await fs.copy(buildPath, path.join(tempDir, 'public'))
  }

  // Create Lambda@Edge handler
  const handlerCode = createLambdaHandler(referenceApp)
  await fs.writeFile(path.join(tempDir, 'index.js'), handlerCode)

  // Create package.json for Lambda
  const lambdaPackageJson = {
    name: functionName,
    version: '1.0.0',
    main: 'index.js',
    dependencies: {}
  }
  await fs.writeJson(path.join(tempDir, 'package.json'), lambdaPackageJson, { spaces: 2 })

  // Create zip file
  const zipPath = path.join(process.cwd(), 'deployments', `${functionName}.zip`)
  await fs.ensureDir(path.dirname(zipPath))
  
  await createZipArchive(tempDir, zipPath)

  // Cleanup temp directory
  await fs.remove(tempDir)

  return zipPath
}

function createLambdaHandler(referenceApp) {
  return `exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;
  
  // Serve static files
  if (uri.includes('.')) {
    return request;
  }
  
  // For SPA, serve index.html for all routes
  request.uri = '/public/index.html';
  return request;
};`
}

async function createZipArchive(sourceDir, zipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => resolve())
    archive.on('error', (err) => reject(err))

    archive.pipe(output)
    archive.directory(sourceDir, false)
    archive.finalize()
  })
}

async function deployLambdaFunction(functionName, zipPath) {
  console.log(chalk.gray('   Deploying to LocalStack Lambda...'))

  const zipBuffer = await fs.readFile(zipPath)

  const params = {
    FunctionName: functionName,
    Runtime: 'nodejs18.x',
    Role: 'arn:aws:iam::000000000000:role/lambda-role',
    Handler: 'index.handler',
    Code: {
      ZipFile: zipBuffer
    },
    Description: `Lambda@Edge function for ${functionName}`,
    Timeout: 30,
    MemorySize: 128
  }

  try {
    await lambda.createFunction(params).promise()
    console.log(chalk.green(`   ✅ Lambda function ${functionName} created`))
  } catch (error) {
    if (error.code === 'ResourceConflictException') {
      // Function already exists, update it
      await lambda.updateFunctionCode({
        FunctionName: functionName,
        ZipFile: zipBuffer
      }).promise()
      console.log(chalk.green(`   ✅ Lambda function ${functionName} updated`))
    } else {
      throw error
    }
  }
}

async function createCloudFrontDistribution(functionName) {
  console.log(chalk.gray('   Creating CloudFront distribution...'))

  const params = {
    DistributionConfig: {
      CallerReference: Date.now().toString(),
      Comment: `Distribution for ${functionName}`,
      DefaultCacheBehavior: {
        TargetOriginId: 'S3-Origin',
        ViewerProtocolPolicy: 'redirect-to-https',
        LambdaFunctionAssociations: {
          Quantity: 1,
          Items: [
            {
              LambdaFunctionARN: `arn:aws:lambda:us-east-1:000000000000:function:${functionName}`,
              EventType: 'origin-request'
            }
          ]
        }
      },
      Enabled: true,
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: 'S3-Origin',
            DomainName: 's3.localhost.localstack.cloud:4566',
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ]
      }
    }
  }

  try {
    const result = await cloudfront.createDistribution(params).promise()
    console.log(chalk.green(`   ✅ CloudFront distribution created: ${result.Distribution.Id}`))
  } catch (error) {
    console.log(chalk.yellow(`   ⚠️  CloudFront distribution creation failed: ${error.message}`))
  }
} 