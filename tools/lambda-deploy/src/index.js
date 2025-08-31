#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import { deployToLocalStack } from './deploy.js'
import { setupLocalStack } from './setup-localstack.js'

const REFERENCE_APPS = [
  {
    name: 'Vite + React (CSR)',
    value: 'vite-react-csr',
    description: 'Modern React app with Vite for client-side rendering'
  },
  {
    name: 'Next.js + React (SSR)',
    value: 'nextjs-react-ssr',
    description: 'Full-stack React app with server-side rendering'
  },
  {
    name: 'Vite + Vue (CSR)',
    value: 'vite-vue-csr',
    description: 'Modern Vue app with Vite for client-side rendering'
  },
  {
    name: 'Nuxt.js + Vue (SSR)',
    value: 'nuxt-vue-ssr',
    description: 'Full-stack Vue app with server-side rendering'
  }
]

async function main() {
  console.log(chalk.blue.bold('🚀 UI Reference Apps Lambda@Edge Deployer'))
  console.log(chalk.gray('Deploy your reference app to Lambda@Edge with LocalStack\n'))

  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          {
            name: 'Setup LocalStack',
            value: 'setup',
            description: 'Initialize LocalStack for local testing'
          },
          {
            name: 'Deploy to LocalStack',
            value: 'deploy',
            description: 'Deploy a reference app to LocalStack Lambda@Edge'
          }
        ]
      }
    ])

    if (answers.action === 'setup') {
      await setupLocalStack()
    } else if (answers.action === 'deploy') {
      const deployAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'referenceApp',
          message: 'Which reference app would you like to deploy?',
          choices: REFERENCE_APPS
        },
        {
          type: 'input',
          name: 'functionName',
          message: 'What should the Lambda function be named?',
          default: (answers) => `${answers.referenceApp}-lambda-edge`
        },
        {
          type: 'confirm',
          name: 'createCloudFront',
          message: 'Would you like to create a CloudFront distribution?',
          default: true
        }
      ])

      await deployToLocalStack(deployAnswers.referenceApp, deployAnswers.functionName, deployAnswers.createCloudFront)
    }

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Error:'), error.message)
    process.exit(1)
  }
}

main() 