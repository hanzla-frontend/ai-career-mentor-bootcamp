import dotenv from 'dotenv';
dotenv.config();

export const config = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  MAX_TOKENS: parseInt(process.env.MAX_TOKENS) || 4096,
  PRIVACY_SCRUB_ENABLED: process.env.PRIVACY_SCRUB_ENABLED !== 'false',
};