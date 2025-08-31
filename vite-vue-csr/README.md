# Vite + Vue CSR Reference App

A modern Vue 3 application built with Vite for client-side rendering, demonstrating enterprise-level development practices.

## Features

- **Modern Build Tooling**: Vite for fast development and optimized builds
- **Vue 3 Composition API**: Modern Vue development with TypeScript
- **Component Architecture**: Organized component structure with proper separation of concerns
- **Service Layer**: Clean API integration with axios
- **Testing Strategy**: Comprehensive testing with Jest and Playwright
- **Proxy Configuration**: Development proxy for API calls
- **Docker Support**: Containerized deployment with nginx
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

The application will start on `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
vite-vue-csr/
├── src/
│   ├── components/          # Vue components
│   │   ├── Header.vue
│   │   ├── Content.vue
│   │   ├── Footer.vue
│   │   └── __tests__/       # Component tests
│   ├── services/            # API services
│   │   ├── MessageService.ts
│   │   ├── DataService.ts
│   │   └── __tests__/       # Service tests
│   ├── types/               # TypeScript types
│   │   └── api.ts
│   ├── App.vue             # Main app component
│   ├── main.ts             # App entry point
│   ├── style.css           # Global styles
│   └── App.css             # App styles
├── tests/                   # Playwright tests
│   ├── component/           # Component tests (mocked)
│   └── live-dependency/     # Live dependency tests
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── playwright.config.ts    # Playwright configuration
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration
├── docker-compose.yml      # Docker Compose
└── README.md               # This file
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

- **MessageService**: Fetches welcome messages
- **DataService**: Retrieves sample data
- **Proxy Configuration**: Development proxy in `vite.config.ts`

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
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3001`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
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

- **Components**: Reusable Vue components in `src/components/`
- **Services**: API integration in `src/services/`
- **Types**: TypeScript definitions in `src/types/`
- **Tests**: Comprehensive test suites with proper mocking

### Styling

- Global styles in `src/style.css`
- Component-specific styles in individual `.vue` files
- Responsive design with mobile-first approach

### State Management

- Vue 3 Composition API for local state
- Service layer for API state
- Error handling and loading states

## Deployment Strategies

### Docker Deployment
- Multi-stage build for optimization
- Nginx for serving static assets
- Health checks and proper logging

### Environment Configuration
- Environment variables for API configuration
- Development vs production settings
- Proxy configuration for local development

## Contributing

1. Follow the established component structure
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation as needed

## License

MIT License 