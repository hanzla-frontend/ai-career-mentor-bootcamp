import express from 'express';
import { uploadController } from '../controllers/uploadController.js';

const router = express.Router();

// Upload a file
router.post('/', uploadController.uploadFile);

// Delete uploaded file
router.delete('/', uploadController.deleteFile);

export default router;