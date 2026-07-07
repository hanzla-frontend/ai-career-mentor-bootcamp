import express from 'express';
import careerRoutes from './careerRoutes.js';
import chatRoutes from './chatRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import salaryRoutes from './salaryRoutes.js';
import skillGapRoutes from './skillGapRoutes.js';
import interviewRoutes from './interviewRoutes.js';
import resumeRoutes from './resumeRoutes.js';

const router = express.Router();

router.use('/career', careerRoutes);
router.use('/chat', chatRoutes);
router.use('/upload', uploadRoutes);
router.use('/salary', salaryRoutes);
router.use('/skill-gap', skillGapRoutes);
router.use('/interview', interviewRoutes);
router.use('/resume', resumeRoutes);

router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;