import { Router } from 'express';
// import { authRequire } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../validations/task.schema.js';
import { verifyToken } from '../controllers/auth.controller.js';
import { authRequire } from '../middlewares/validateToken.js';

const router = Router();

router.get('/task', authRequire, getTasks)
router.get('/task/:id', authRequire, getTask)
router.post('/task', validateSchema(createTaskSchema), authRequire, createTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)

export default router