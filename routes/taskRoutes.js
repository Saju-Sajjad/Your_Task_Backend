import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../controllers/userController.js'; // Import the verifyToken middleware

const router = express.Router();

// Middleware to verify user token for task routes
router.use(verifyToken);

// Routes for tasks
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
