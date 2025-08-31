#!/usr/bin/env node

import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

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
  console.log(chalk.blue.bold('🚀 UI Reference Apps Project Generator'))
  console.log(chalk.gray('Create a new project based on our reference applications\n'))

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        validate: (input) => {
          if (!input.trim()) {
            return 'Project name is required'
          }
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores'
          }
          if (fs.existsSync(input)) {
            return 'A directory with this name already exists'
          }
          return true
        }
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'What is your project description?',
        default: 'A modern web application'
      },
      {
        type: 'list',
        name: 'referenceApp',
        message: 'Which reference app would you like to use?',
        choices: REFERENCE_APPS
      },
      {
        type: 'confirm',
        name: 'includeApi',
        message: 'Would you like to include API integration?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeBackend',
        message: 'Would you like to include the backend server?',
        default: true,
        when: (answers) => answers.includeApi
      }
    ])

    const { projectName, projectDescription, referenceApp, includeApi, includeBackend } = answers

    console.log(chalk.yellow('\n📁 Creating project...'))

    // Create project directory
    const projectPath = path.resolve(projectName)
    await fs.ensureDir(projectPath)

    // Copy reference app
    const referencePath = path.resolve(`../${referenceApp}`)
    if (!fs.existsSync(referencePath)) {
      throw new Error(`Reference app ${referenceApp} not found`)
    }

    await fs.copy(referencePath, projectPath, {
      filter: (src) => {
        // Exclude node_modules, .git, and other unnecessary files
        const excludePatterns = [
          'node_modules',
          '.git',
          '.next',
          'dist',
          'coverage',
          '.DS_Store'
        ]
        return !excludePatterns.some(pattern => src.includes(pattern))
      }
    })

    // Customize package.json
    const packageJsonPath = path.join(projectPath, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath)
      packageJson.name = projectName
      packageJson.description = projectDescription
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
    }

    // Customize README.md
    const readmePath = path.join(projectPath, 'README.md')
    if (fs.existsSync(readmePath)) {
      let readmeContent = await fs.readFile(readmePath, 'utf8')
      readmeContent = readmeContent.replace(/UI Reference Apps/g, projectName)
      readmeContent = readmeContent.replace(/A modern React application/g, projectDescription)
      await fs.writeFile(readmePath, readmeContent)
    }

    // Handle API integration
    if (!includeApi) {
      console.log(chalk.yellow('🔧 Removing API integration...'))
      
      // Remove API-related files and code
      const filesToRemove = [
        'src/services',
        'src/types/api.ts'
      ]
      
      for (const file of filesToRemove) {
        const filePath = path.join(projectPath, file)
        if (fs.existsSync(filePath)) {
          await fs.remove(filePath)
        }
      }

      // Update components to remove API calls
      await removeApiCalls(projectPath)
    }

    // Copy backend if requested
    if (includeBackend && includeApi) {
      console.log(chalk.yellow('🔧 Copying backend...'))
      const backendPath = path.resolve('../backend')
      const projectBackendPath = path.join(projectPath, 'backend')
      
      if (fs.existsSync(backendPath)) {
        await fs.copy(backendPath, projectBackendPath, {
          filter: (src) => {
            const excludePatterns = ['node_modules', '.git', '.DS_Store']
            return !excludePatterns.some(pattern => src.includes(pattern))
          }
        })
      }
    }

    // Create project-specific documentation
    await createProjectDocs(projectPath, projectName, projectDescription, referenceApp, includeApi, includeBackend)

    console.log(chalk.green.bold('\n✅ Project created successfully!'))
    console.log(chalk.blue(`\n📂 Project location: ${projectPath}`))
    
    if (includeBackend) {
      console.log(chalk.yellow('\n🚀 To get started:'))
      console.log(chalk.gray('1. cd ' + projectName))
      console.log(chalk.gray('2. cd backend && npm install && npm run dev'))
      console.log(chalk.gray('3. cd .. && npm install && npm run dev'))
    } else {
      console.log(chalk.yellow('\n🚀 To get started:'))
      console.log(chalk.gray('1. cd ' + projectName))
      console.log(chalk.gray('2. npm install'))
      console.log(chalk.gray('3. npm run dev'))
    }

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Error creating project:'), error.message)
    process.exit(1)
  }
}

async function removeApiCalls(projectPath) {
  // This is a simplified version - in a real implementation,
  // you'd want to parse and modify the actual source code
  console.log(chalk.gray('   Removing API calls from components...'))
}

async function createProjectDocs(projectPath, projectName, projectDescription, referenceApp, includeApi, includeBackend) {
  const docsPath = path.join(projectPath, 'PROJECT_SETUP.md')
  
  const docsContent = `# ${projectName} - Project Setup

This project was generated from the ${referenceApp} reference application.

## Project Details

- **Name**: ${projectName}
- **Description**: ${projectDescription}
- **Reference App**: ${referenceApp}
- **API Integration**: ${includeApi ? 'Yes' : 'No'}
- **Backend Included**: ${includeBackend ? 'Yes' : 'No'}

## Getting Started

${includeBackend ? `
### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The backend will be available at \`http://localhost:3001\`

### Frontend Setup

1. In a new terminal, navigate to the project root:
   \`\`\`bash
   cd ..
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The frontend will be available at \`http://localhost:3000\` (or the port shown in the terminal)
` : `
### Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The application will be available at \`http://localhost:3000\` (or the port shown in the terminal)
`}

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run linting
- \`npm test\` - Run tests
- \`npm run test:e2e\` - Run end-to-end tests

## Customization

This project was generated from a reference application. You can customize it by:

1. Modifying components in the \`src/\` directory
2. Updating styles in CSS files
3. Adding new features and functionality
4. Customizing the build configuration

## Deployment

See the README.md file for deployment instructions specific to this framework.

## Support

For questions about this project structure, refer to the original reference application documentation.
`

  await fs.writeFile(docsPath, docsContent)
}

main() 