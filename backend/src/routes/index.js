import express from 'express';
import careerRoutes from './careerRoutes.js';
import chatRoutes from './chatRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

router.use('/career', careerRoutes);
router.use('/chat', chatRoutes);
router.use('/upload', uploadRoutes);

router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

export default router;