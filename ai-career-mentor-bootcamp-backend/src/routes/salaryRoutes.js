import express from 'express';
import { salaryController } from '../controllers/salaryController.js';

const router = express.Router();

router.get('/:career', salaryController.getSalary);
router.post('/compare', salaryController.compareSalaries);
router.get('/trends/:career', salaryController.getTrends);

export default router;
