import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API endpoints
app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from UI Reference Backend!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/data', (req, res) => {
  const sampleData = {
    items: [
      { id: 1, name: 'Reference App 1', description: 'Vite + React CSR' },
      { id: 2, name: 'Reference App 2', description: 'Next.js + React SSR' },
      { id: 3, name: 'Reference App 3', description: 'Vite + Vue CSR' },
      { id: 4, name: 'Reference App 4', description: 'Nuxt.js + Vue SSR' }
    ],
    total: 4,
    timestamp: new Date().toISOString()
  };
  
  res.json(sampleData);
});

app.post('/api/echo', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({
      error: 'Message is required'
    });
  }
  
  res.json({
    echo: message,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 UI Reference Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base: http://localhost:${PORT}/api`);
});

export default app; 