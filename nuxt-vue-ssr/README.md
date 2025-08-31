# Nuxt.js + Vue SSR Reference App

A full-stack Vue 3 application built with Nuxt.js for server-side rendering, demonstrating enterprise-level development practices.

## Features

- **Full-Stack Framework**: Nuxt.js 3 with Vue 3 and TypeScript
- **Server-Side Rendering**: SEO-friendly SSR capabilities
- **Auto-Imports**: Automatic component and composable imports
- **File-Based Routing**: Intuitive routing based on file structure
- **API Integration**: Built-in API routes and server-side data fetching
- **Testing Strategy**: Comprehensive testing with Jest and Playwright
- **Docker Support**: Containerized deployment
- **Responsive Design**: Mobile-first responsive layout

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
nuxt-vue-ssr/
├── app.vue                 # Main app component
├── nuxt.config.ts          # Nuxt.js configuration
├── components/             # Vue components
│   ├── Header.vue
│   ├── Content.vue
│   └── Footer.vue
├── types/                  # TypeScript types
│   └── api.ts
├── assets/                 # Static assets
│   └── css/
│       └── main.css
├── tests/                  # Playwright tests
│   ├── component/          # Component tests (mocked)
│   └── live-dependency/   # Live dependency tests
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
├── playwright.config.ts   # Playwright configuration
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose
└── README.md              # This file
```

## Testing

### Unit Tests (Jest)

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Functional Tests (Playwright)

```bash
# Run all functional tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode
npm run test:e2e:headed
```

#### Test Categories

1. **Component Tests** (`tests/component/`): Isolated component testing with mocked API calls
2. **Live Dependency Tests** (`tests/live-dependency/`): End-to-end testing with real backend integration

## API Integration

The application integrates with the backend API through:

- **useFetch**: Nuxt's built-in composable for data fetching
- **$fetch**: Universal fetch utility
- **Proxy Configuration**: Development proxy in `nuxt.config.ts`

### API Endpoints Used

- `GET /api/message` - Welcome message
- `GET /api/data` - Sample data

## Docker Deployment

### Build and Run

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

### Using Docker Compose

```bash
# Start both frontend and backend
npm run docker:compose
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:3001`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run functional tests
- `npm run test:e2e:ui` - Run tests with UI
- `npm run test:e2e:headed` - Run tests in headed mode
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with Docker Compose

## Development Guidelines

### Code Organization

- **Components**: Reusable Vue components in `components/`
- **Types**: TypeScript definitions in `types/`
- **Assets**: Static assets in `assets/`
- **Tests**: Comprehensive test suites with proper mocking

### Styling

- Global styles in `assets/css/main.css`
- Component-specific styles in individual `.vue` files
- Responsive design with mobile-first approach

### State Management

- Nuxt's built-in state management
- Server-side data fetching with `useFetch`
- Error handling and loading states

## Nuxt.js Features

### Auto-Imports

Components and composables are automatically imported:

```vue
<template>
  <Header /> <!-- Automatically imported -->
</template>

<script setup>
// useFetch is automatically available
const { data } = await useFetch('/api/message')
</script>
```

### File-Based Routing

Create routes by adding files to the `pages/` directory:

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/users/[id].vue` → `/users/:id`

### Server-Side Rendering

Data is fetched on the server for better SEO and performance:

```vue
<script setup>
// This runs on the server during SSR
const { data } = await useFetch('/api/data')
</script>
```

## Deployment Strategies

### Docker Deployment
- Multi-stage build for optimization
- Node.js runtime for SSR
- Health checks and proper logging

### Static Site Generation
```bash
npm run generate
```

### Platform Deployment

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Environment Configuration

### Development
```env
NODE_ENV=development
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Production
```env
NODE_ENV=production
NUXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

## Contributing

1. Follow the established component structure
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation as needed

## License

MIT License 