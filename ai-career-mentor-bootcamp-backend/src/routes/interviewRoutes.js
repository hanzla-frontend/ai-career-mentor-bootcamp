import express from 'express';
import { interviewController } from '../controllers/interviewController.js';

const router = express.Router();

router.post('/generate', interviewController.generate);
router.post('/mock', interviewController.mock);

export default router;