import express from 'express';
import { resumeController } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/generate', resumeController.generate);
router.post('/tailor', resumeController.tailor);

export default router;