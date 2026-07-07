import express from 'express';
import { skillGapController } from '../controllers/skillGapController.js';

const router = express.Router();

router.post('/analyze', skillGapController.analyze);
router.post('/learning-path', skillGapController.learningPath);

export default router;