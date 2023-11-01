import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors({
    origin: 'https://javier-task-list.netlify.app', // Dominio permitido
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras personalizadas permitidas
    credentials: true, // Permitir enviar cookies
}));

app.use(cors({
    origin: 'https://javier-task-list.netlify.app/login', // Dominio permitido
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras personalizadas permitidas
    credentials: true, // Permitir enviar cookies
}));

app.use(cors({
    origin: 'https://javier-task-list.netlify.app/register', // Dominio permitido
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras personalizadas permitidas
    credentials: true, // Permitir enviar cookies
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

export default app;