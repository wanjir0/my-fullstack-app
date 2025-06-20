
import express from 'express';
import { addClassroom, getAllClassrooms } from '../controllers/classroomController.js';

const router = express.Router();

router.post('/', addClassroom);
router.get('/', getAllClassrooms);

export default router;