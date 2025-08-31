# UI Reference Backend

A simple Node.js Express server providing API endpoints for UI reference applications.

## Features

- **RESTful API**: Clean API endpoints for frontend applications
- **CORS Support**: Configured for cross-origin requests
- **Security**: Helmet middleware for security headers
- **Logging**: Morgan for HTTP request logging
- **Health Checks**: Built-in health monitoring endpoint
- **Testing**: Comprehensive test suite with Jest
- **Docker Support**: Containerized deployment
- **Environment Configuration**: Environment-based configuration

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

The server will start on `http://localhost:3001`

### Production

```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server health status and uptime information

### Message API
- **GET** `/api/message`
- Returns a welcome message with timestamp

### Data API
- **GET** `/api/data`
- Returns sample data for UI reference applications

### Echo API
- **POST** `/api/echo`
- Echoes back the provided message
- Body: `{ "message": "string" }`

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3001
```

## Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Docker

### Build image
```bash
npm run docker:build
```

### Run container
```bash
npm run docker:run
```

### Using Docker Compose
```bash
npm run docker:compose
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with Docker Compose

## Project Structure

```
backend/
├── src/
│   └── index.js          # Main server file
├── tests/
│   └── index.test.js      # API tests
├── package.json           # Dependencies and scripts
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## Deployment

### Docker Deployment
The application includes Docker support for easy deployment:

1. Build the image: `docker build -t ui-reference-backend .`
2. Run the container: `docker run -p 3001:3001 ui-reference-backend`

### Environment Variables for Production
Set the following environment variables in production:

- `NODE_ENV=production`
- `PORT=3001` (or your preferred port)

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

MIT License 