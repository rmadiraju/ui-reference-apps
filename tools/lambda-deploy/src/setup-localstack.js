import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'

export async function setupLocalStack() {
  console.log(chalk.yellow('\n🔧 Setting up LocalStack environment...'))

  try {
    // Create docker-compose file for LocalStack
    await createDockerCompose()

    // Create setup script
    await createSetupScript()

    // Create documentation
    await createDocumentation()

    console.log(chalk.green.bold('\n✅ LocalStack setup completed!'))
    console.log(chalk.blue('\n📋 Next steps:'))
    console.log(chalk.gray('1. Start LocalStack: docker-compose up -d'))
    console.log(chalk.gray('2. Wait for LocalStack to be ready'))
    console.log(chalk.gray('3. Run the deployment script'))

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Setup failed:'), error.message)
    throw error
  }
}

async function createDockerCompose() {
  const dockerComposeContent = `version: '3.8'

services:
  localstack:
    image: localstack/localstack:latest
    container_name: ui-reference-localstack
    ports:
      - "4566:4566"
    environment:
      - SERVICES=lambda,cloudfront,s3
      - DEBUG=1
      - DATA_DIR=/tmp/localstack/data
      - DOCKER_HOST=unix:///var/run/docker.sock
      - AWS_DEFAULT_REGION=us-east-1
      - LAMBDA_EXECUTOR=docker
      - LAMBDA_REMOTE_DOCKER=false
      - PERSISTENCE=1
    volumes:
      - "\${TMPDIR:-/tmp}/localstack:/tmp/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
    networks:
      - localstack

networks:
  localstack:
    driver: bridge
`

  const dockerComposePath = path.join(process.cwd(), 'docker-compose.yml')
  await fs.writeFile(dockerComposePath, dockerComposeContent)
  console.log(chalk.green('   ✅ Created docker-compose.yml'))
}

async function createSetupScript() {
  const setupScriptContent = `#!/bin/bash

echo "🚀 Starting LocalStack..."
docker-compose up -d

echo "⏳ Waiting for LocalStack to be ready..."
until curl -s http://localhost:4566/_localstack/health > /dev/null; do
  echo "   Waiting for LocalStack..."
  sleep 2
done

echo "✅ LocalStack is ready!"
echo "🌐 LocalStack endpoint: http://localhost:4566"
echo "📊 LocalStack dashboard: http://localhost:4566/_localstack/dashboard"
`

  const setupScriptPath = path.join(process.cwd(), 'start-localstack.sh')
  await fs.writeFile(setupScriptPath, setupScriptContent)
  await fs.chmod(setupScriptPath, '755')
  console.log(chalk.green('   ✅ Created start-localstack.sh'))
}

async function createDocumentation() {
  const docsContent = `# LocalStack Setup for UI Reference Apps

This directory contains the LocalStack setup for testing Lambda@Edge deployments locally.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ installed

## Quick Start

1. **Start LocalStack:**
   \`\`\`bash
   ./start-localstack.sh
   \`\`\`

   Or manually:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. **Wait for LocalStack to be ready:**
   LocalStack will be available at http://localhost:4566

3. **Deploy a reference app:**
   \`\`\`bash
   npm start
   \`\`\`

## LocalStack Services

- **Lambda**: http://localhost:4566
- **CloudFront**: http://localhost:4566
- **S3**: http://localhost:4566
- **Dashboard**: http://localhost:4566/_localstack/dashboard

## Configuration

The LocalStack configuration is set up for:
- Region: us-east-1
- Access Key: test
- Secret Key: test

## Troubleshooting

### LocalStack not starting
- Check if Docker is running
- Check if port 4566 is available
- Check Docker logs: \`docker-compose logs localstack\`

### Lambda deployment fails
- Ensure LocalStack is fully started
- Check Lambda service logs
- Verify function code is valid

### CloudFront issues
- CloudFront in LocalStack has limited functionality
- Some features may not work as expected

## Cleanup

To stop LocalStack:
\`\`\`bash
docker-compose down
\`\`\`

To remove all data:
\`\`\`bash
docker-compose down -v
\`\`\`
`

  const docsPath = path.join(process.cwd(), 'LOCALSTACK_SETUP.md')
  await fs.writeFile(docsPath, docsContent)
  console.log(chalk.green('   ✅ Created LOCALSTACK_SETUP.md'))
} 