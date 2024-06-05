import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

// Middleware to verify user token for task routes
router.use(verifyToken);

// Routes for tasks
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
