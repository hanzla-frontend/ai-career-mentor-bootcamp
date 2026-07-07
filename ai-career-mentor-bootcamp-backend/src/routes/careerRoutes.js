import express from 'express';
import { careerController } from '../controllers/careerController.js';

const router = express.Router();

router.post('/discover', careerController.discoverInterests);
router.post('/match', careerController.matchCareers);
router.post('/roadmap', careerController.buildRoadmap);

export default router;