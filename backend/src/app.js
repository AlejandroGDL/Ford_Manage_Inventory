import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth-routes.js';
import itemsRoutes from './routes/items-routes.js';
import categoryRoutes from './routes/category-routes.js';
import studentRoutes from './routes/student-routes.js';
import prestamosRoutes from './routes/prestamos-routes.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/prestamos', prestamosRoutes);

export default app;
