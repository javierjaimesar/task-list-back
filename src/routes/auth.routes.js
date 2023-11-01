import { Router } from 'express';
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequire } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.schema.js';

const router = Router();

router.post('/api/register', validateSchema(registerSchema), register)

router.post('/api/login', validateSchema(loginSchema), login)

router.post('/api/logout', logout)

router.get('/api/verify', verifyToken)

router.get('/api/profile', authRequire, profile)

export default router;