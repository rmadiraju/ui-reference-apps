# UI Reference Apps

A comprehensive collection of reference applications demonstrating different UI frameworks and deployment strategies for enterprise applications.

## Overview

This project contains multiple reference applications built with different frameworks and technologies, each demonstrating best practices for enterprise-level development including:

- **Component Architecture**: Organized component structure
- **Service Layer**: API integration and data management
- **Testing Strategy**: Unit tests (Jest) and functional tests (Playwright)
- **Build & Deployment**: Production-ready build scripts and deployment strategies
- **Proxy Configuration**: API proxy setup for development
- **Docker Support**: Containerization for each application
- **Lambda@Edge Support**: Serverless deployment capabilities

## Reference Applications

### Frontend Applications

1. **vite-react-csr** - Vite + React (Client-Side Rendering) ✅
   - Modern build tooling with Vite
   - React 18+ with TypeScript
   - Client-side routing and state management
   - Comprehensive testing with Jest and Playwright
   - Docker deployment with nginx

2. **nextjs-react-ssr** - Next.js + React (Server-Side Rendering) ✅
   - Full-stack React framework
   - Server-side rendering and static generation
   - Built-in API routes
   - App Router with async components
   - Docker deployment with Node.js

3. **vite-vue-csr** - Vite + Vue (Client-Side Rendering) ✅
   - Vue 3 with Composition API
   - Vite for fast development and building
   - TypeScript support
   - Component-based architecture
   - Docker deployment with nginx

4. **nuxt-vue-ssr** - Nuxt.js + Vue (Server-Side Rendering) ✅
   - Full-stack Vue framework
   - Server-side rendering and static generation
   - Auto-imports and file-based routing
   - Built-in data fetching with useFetch
   - Docker deployment with Node.js

### Backend Application

5. **backend** - Node.js Express Server ✅
   - RESTful API endpoints
   - CORS configuration
   - Health check endpoints
   - Production-ready setup
   - Comprehensive Jest testing
   - Docker deployment with multi-stage builds

## Project Structure

```
ui-reference-apps/
├── README.md                           # This file
├── vite-react-csr/                     # Vite + React CSR app
├── nextjs-react-ssr/                   # Next.js + React SSR app
├── vite-vue-csr/                       # Vite + Vue CSR app
├── nuxt-vue-ssr/                       # Nuxt.js + Vue SSR app
├── backend/                            # Node.js Express server
├── tools/                              # Utility scripts
│   ├── project-generator/              # Project scaffolding tool
│   └── lambda-deploy/                  # Lambda@Edge deployment scripts
└── docs/                               # Additional documentation
```

## Getting Started

Each reference application is self-contained with its own `package.json` and can be run independently.

### Quick Start

1. **Backend First**: Start the backend server
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Apps**: Choose any frontend app and start it
   ```bash
   # Vite + React CSR
   cd vite-react-csr
   npm install
   npm run dev
   
   # Next.js + React SSR
   cd nextjs-react-ssr
   npm install
   npm run dev
   
   # Vite + Vue CSR
   cd vite-vue-csr
   npm install
   npm run dev
   
   # Nuxt.js + Vue SSR
   cd nuxt-vue-ssr
   npm install
   npm run dev
   ```

### Ports Used

- **Backend**: `http://localhost:3001`
- **Vite React CSR**: `http://localhost:5173`
- **Next.js React SSR**: `http://localhost:3000`
- **Vite Vue CSR**: `http://localhost:5173`
- **Nuxt.js Vue SSR**: `http://localhost:3000`

## Testing Strategy

Each application includes comprehensive testing:

### Unit Tests (Jest)
- Component testing
- Service layer testing
- Utility function testing

### Functional Tests (Playwright)
- **Component Tests**: Isolated component testing with mocked API calls
- **Live Dependency Tests**: End-to-end testing with real backend integration

## Deployment Strategies

### Docker Deployment
Each application includes:
- `Dockerfile` for containerization
- `docker-compose.yml` for local development
- Multi-stage builds for production optimization

### Lambda@Edge Deployment
- Serverless deployment scripts
- LocalStack integration for local testing
- CloudFront distribution setup

## Project Generator

Use the project generator to create new applications based on these reference apps:

```bash
cd tools/project-generator
npm install
npm start
```

The generator will:
- Copy selected reference app structure
- Customize project name and description
- Optionally include/exclude API integration
- Set up appropriate tests and configurations

## Development Guidelines

### Code Organization
- **Components**: Reusable UI components
- **Services**: API integration and data management
- **Utils**: Helper functions and utilities
- **Types**: TypeScript type definitions
- **Tests**: Comprehensive test suites

### Build Scripts
Each application includes:
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: Code linting
- `npm run test`: Run all tests
- `npm run test:unit`: Unit tests only
- `npm run test:e2e`: End-to-end tests only

## Contributing

When adding new reference applications:
1. Follow the established folder structure
2. Include comprehensive testing
3. Add Docker support
4. Update this README
5. Include deployment documentation

## License

MIT License - see individual application folders for specific licensing information.