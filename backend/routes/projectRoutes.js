
import express from 'express';
import {createProject, updateProject , getProject, deleteProject} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createProject);
router.put('/update/:projectId', updateProject);
router.get('/', getProject)
router.delete('/:id',deleteProject);

export default router;

