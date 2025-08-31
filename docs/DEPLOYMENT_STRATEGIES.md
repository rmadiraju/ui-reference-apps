# Deployment Strategies for UI Reference Apps

This document outlines various deployment strategies available for the UI reference applications.

## Overview

Each reference application includes multiple deployment options:

1. **Docker Deployment** - Containerized applications
2. **Lambda@Edge Deployment** - Serverless edge computing
3. **Traditional Hosting** - Standard web hosting
4. **Platform-Specific Deployment** - Framework-specific deployment options

## Docker Deployment

### Prerequisites

- Docker and Docker Compose installed
- Docker Hub account (optional, for pushing images)

### Quick Start

Each application includes Docker configuration:

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run

# Or use Docker Compose for full stack
npm run docker:compose
```

### Docker Compose Setup

The `docker-compose.yml` files include:

- **Frontend**: Nginx serving static assets
- **Backend**: Node.js Express server
- **Networking**: Proper service communication
- **Health Checks**: Container health monitoring

### Production Considerations

- **Multi-stage builds** for optimized images
- **Security headers** in nginx configuration
- **Environment variables** for configuration
- **Volume mounts** for persistent data

## Lambda@Edge Deployment

### Overview

Lambda@Edge allows running code at CloudFront edge locations, enabling:

- **Global distribution** with low latency
- **Server-side rendering** at the edge
- **Custom routing** and redirects
- **Security enhancements**

### Prerequisites

- AWS account with appropriate permissions
- LocalStack for local testing (optional)

### LocalStack Setup

```bash
cd tools/lambda-deploy
npm install
npm run setup-localstack
./start-localstack.sh
```

### Deployment Process

1. **Build the application**
2. **Create deployment package**
3. **Upload to Lambda@Edge**
4. **Configure CloudFront distribution**

### Use Cases

- **Static site hosting** with custom routing
- **A/B testing** at the edge
- **Geographic routing** based on user location
- **Security headers** and redirects

## Platform-Specific Deployment

### Vite Applications

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Next.js Applications

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### AWS Amplify

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize and deploy
amplify init
amplify add hosting
amplify publish
```

### Nuxt.js Applications

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## Environment Configuration

### Development Environment

```env
NODE_ENV=development
API_BASE_URL=http://localhost:3001/api
```

### Production Environment

```env
NODE_ENV=production
API_BASE_URL=https://your-api-domain.com/api
```

### Environment Variables by Platform

#### Vercel

- Use Vercel dashboard or CLI
- Environment variables are automatically available

#### Netlify

- Use Netlify dashboard
- Prefix with `VITE_` for Vite apps

#### AWS Amplify

- Use Amplify console
- Environment variables are automatically available

## Performance Optimization

### Build Optimization

- **Tree shaking** for unused code removal
- **Code splitting** for lazy loading
- **Asset optimization** (images, fonts, etc.)
- **Bundle analysis** for size monitoring

### Runtime Optimization

- **CDN caching** for static assets
- **Service worker** for offline support
- **Image optimization** and lazy loading
- **Critical CSS** inlining

### Monitoring

- **Performance metrics** (LCP, FID, CLS)
- **Error tracking** and reporting
- **User analytics** and behavior
- **Uptime monitoring**

## Security Considerations

### HTTPS Enforcement

- **SSL/TLS certificates** (automatic with most platforms)
- **HSTS headers** for security
- **Mixed content** prevention

### Content Security Policy

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### Security Headers

- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **Referrer-Policy**: Control referrer information
- **Permissions-Policy**: Control browser features

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

### GitLab CI

```yaml
deploy:
  stage: deploy
  script:
    - npm ci
    - npm run build
    - npm run deploy
  only:
    - main
```

## Troubleshooting

### Common Issues

1. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Deployment failures**
   - Verify platform-specific requirements
   - Check environment variables
   - Review deployment logs

3. **Runtime errors**
   - Check browser console for client-side errors
   - Review server logs for backend issues
   - Verify API endpoints are accessible

### Debugging Tools

- **Browser DevTools** for client-side debugging
- **Platform-specific logs** for deployment issues
- **Performance monitoring** tools
- **Error tracking** services

## Best Practices

### Code Organization

- **Environment-specific configurations**
- **Feature flags** for gradual rollouts
- **Proper error handling** and logging
- **Type safety** with TypeScript

### Deployment Strategy

- **Blue-green deployments** for zero downtime
- **Canary releases** for risk mitigation
- **Rollback procedures** for quick recovery
- **Monitoring and alerting** for proactive response

### Performance

- **Lighthouse audits** for performance scoring
- **Bundle analysis** for size optimization
- **Caching strategies** for improved loading
- **CDN utilization** for global distribution

## Conclusion

Each deployment strategy offers unique benefits:

- **Docker**: Consistent environments and easy scaling
- **Lambda@Edge**: Global distribution and edge computing
- **Platform-specific**: Optimized for each framework
- **Traditional hosting**: Full control and customization

Choose the deployment strategy that best fits your requirements for performance, scalability, and maintenance. 