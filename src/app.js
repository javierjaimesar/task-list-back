import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

const corsOptions = {
    origin: ['https://javier-task-list.netlify.app', 'http://localhost:5173'], // Dominio permitido
    credentials: true, // Permitir enviar cookies
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras personalizadas permitidas
};

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

export default app;