import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

const corsOptions = {
    origin: ['https://javier-task-list.netlify.app', 'http://localhost:5173'], // Dominio permitido
    credentials: true, // Permitir enviar cookies
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras personalizadas permitidas
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://javier-task-list.netlify.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
})
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

export default app;