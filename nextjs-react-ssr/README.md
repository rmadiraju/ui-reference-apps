# Next.js + React SSR Reference App

A full-stack React application built with Next.js for server-side rendering, demonstrating enterprise-level development practices.

## Features

- **Full-Stack Framework**: Next.js 14 with React 18 and TypeScript
- **Server-Side Rendering**: SEO-friendly SSR capabilities
- **App Router**: Modern Next.js routing system
- **API Routes**: Built-in API endpoints
- **Component Architecture**: Organized component structure
- **Service Layer**: Clean API integration with axios
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
npm run start
```

## Project Structure

```
nextjs-react-ssr/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Content.tsx
│   │   └── Footer.tsx
│   ├── services/            # API services
│   │   ├── MessageService.ts
│   │   └── DataService.ts
│   └── types/               # TypeScript types
│       └── api.ts
├── tests/                   # Playwright tests
│   ├── component/           # Component tests (mocked)
│   └── live-dependency/     # Live dependency tests
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
├── playwright.config.ts    # Playwright configuration
├── Dockerfile              # Docker configuration
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

- **Server-side data fetching**: Using async components
- **Service layer**: Clean API integration with axios
- **Proxy Configuration**: Development proxy in `next.config.js`

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
- `npm run start` - Start production server
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

- **Components**: Reusable React components in `src/components/`
- **Services**: API integration in `src/services/`
- **Types**: TypeScript definitions in `src/types/`
- **Tests**: Comprehensive test suites with proper mocking

### Styling

- Global styles in `src/app/globals.css`
- Component-specific styles in individual components
- Responsive design with mobile-first approach

### State Management

- React hooks for local state
- Server-side data fetching with async components
- Error handling and loading states

## Next.js Features

### App Router

The application uses Next.js 14 App Router:

```tsx
// src/app/page.tsx
export default async function HomePage() {
  // Server-side data fetching
  const data = await fetchData()
  
  return (
    <div>
      {/* Your component */}
    </div>
  )
}
```

### Server-Side Rendering

Data is fetched on the server for better SEO and performance:

```tsx
// This runs on the server during SSR
const message = await MessageService.getMessage()
```

### API Routes

Create API endpoints in the `app/api/` directory:

```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## Deployment Strategies

### Docker Deployment
- Multi-stage build for optimization
- Node.js runtime for SSR
- Health checks and proper logging

### Platform Deployment

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

#### AWS Amplify
```bash
npm i -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

## Environment Configuration

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

## Contributing

1. Follow the established component structure
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation as needed

## License

MIT License 