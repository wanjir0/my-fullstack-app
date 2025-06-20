
import express from 'express';
import { addMark, getAllMarks } from '../controllers/marksController.js';

const router = express.Router();

router.post('/', addMark);
router.get('/', getAllMarks);

export default router;