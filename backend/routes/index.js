import { Router } from 'express';
import publicRoutes from './public.js';
import adminRoutes from './admin.js';

const router = Router();

// Rutas públicas: /movies, /movie/:id
router.use('/', publicRoutes);

// Rutas admin: /admin/movies
router.use('/admin', adminRoutes);

export default router;
