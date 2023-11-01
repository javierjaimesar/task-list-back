import { Router } from 'express';
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequire } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register)

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile', authRequire, profile)

export default router;