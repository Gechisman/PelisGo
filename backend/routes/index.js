import { Router } from 'express';
import publicRoutes from './public.js';
import adminRoutes from './admin.js';
import authRoutes from './auth.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas públicas: /movies, /movie/:id
router.use('/', publicRoutes);

// Rutas admin: /admin/movies
router.use('/admin', authMiddleware, adminRoutes);

// Rutas de autenticación: /auth/register, /auth/login
router.use('/auth', authRoutes);

export default router;
