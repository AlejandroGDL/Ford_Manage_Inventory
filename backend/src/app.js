import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth-routes.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;
