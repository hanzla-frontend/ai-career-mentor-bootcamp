import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security - UPDATED CORS
app.use(helmet({ contentSecurityPolicy: false }));
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:5174',
//     'http://127.0.0.1:5173',
//     'http://127.0.0.1:5174',
//     "*",
//     process.env.FRONTEND_URL || 'http://localhost:5174'
//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api', routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mode: 'GROQ',
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    timestamp: new Date().toISOString(),
    message: '🎯 AI Career Mentor is running!'
  });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🎯 AI Career Mentor - Backend`);
  console.log(`🚀 Running on: http://localhost:${PORT}`);
  console.log(`🤖 Model: ${process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'}`);
  console.log(`🔒 Privacy Scrubber: ACTIVE`);
  console.log(`🌐 Allowed Origins: http://localhost:5173, http://localhost:5174\n`);
});