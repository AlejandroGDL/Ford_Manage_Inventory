import { Router } from 'express';

import {
  getPrestamos,
  createPrestamo,
  deletePrestamo,
  searchPrestamos,
} from '../controllers/prestamos.controller.js';

const router = Router();

router.get('/', getPrestamos);
router.get('/search', searchPrestamos);
router.post('/', createPrestamo); // Hace el prestamo (Item available = false)
router.delete('/:id', deletePrestamo); // Elimina el prestamo  (Item available = true)

export default router;
