import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../validations/task.schema.js';

const router = Router();

router.get('/task', authRequire, getTasks)
router.get('/task/:id', authRequire, getTask)
router.post('/task', authRequire, validateSchema(createTaskSchema), createTask)
router.delete('/task/:id', authRequire, deleteTask)
router.put('/task/:id', authRequire, updateTask)

export default router