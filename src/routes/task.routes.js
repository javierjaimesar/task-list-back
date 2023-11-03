import { Router } from 'express';
// import { authRequire } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../validations/task.schema.js';

const router = Router();

router.get('/task', getTasks)
router.get('/task/:id', getTask)
router.post('/task', validateSchema(createTaskSchema), createTask)
router.delete('/task/:id', deleteTask)
router.put('/task/:id', updateTask)

export default router