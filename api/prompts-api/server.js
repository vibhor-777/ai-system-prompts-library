'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const promptsRouter = require('./routes/prompts');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'none'"],
      styleSrc: ["'none'"],
      imgSrc: ["'none'"],
      connectSrc: ["'self'"],
      fontSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
}));

// CORS
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
    retryAfter: '15 minutes',
  },
});

app.use(limiter);

// Request logging
app.use(morgan('combined'));

// Parse JSON bodies
app.use(express.json());

// Attach library root to request
app.use((req, res, next) => {
  req.libraryRoot = path.resolve(__dirname, '../../');
  req.promptsDir = path.join(req.libraryRoot, 'prompts');
  next();
});

// API routes
app.use('/api', promptsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    version: '1.5.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API info at root
app.get('/', (req, res) => {
  res.json({
    name: 'AI System Prompts Library API',
    version: '1.5.0',
    description: 'REST API for research reconstructions of AI model system prompts',
    endpoints: {
      list: 'GET /api/prompts',
      model: 'GET /api/prompts/:model',
      content: 'GET /api/prompts/:model/:type',
      compare: 'GET /api/compare?m1=<model1>&m2=<model2>',
      search: 'GET /api/search?q=<query>',
      health: 'GET /health',
    },
    documentation: 'https://github.com/vibhor-777/ai-system-prompts-library/tree/main/api/prompts-api',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.path}`,
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🤖 AI System Prompts Library API`);
  console.log(`   Server: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`   Library: ${path.resolve(__dirname, '../../')}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
