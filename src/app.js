import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors({
    origin: 'https://javier-task-list.netlify.app/',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api', authRoutes)
app.use('/api', taskRoutes)

export default app;