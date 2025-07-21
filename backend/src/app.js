import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth-routes.js';
import itemsRoutes from './routes/items-routes.js';
import categoryRoutes from './routes/category-routes.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoryRoutes);

export default app;
