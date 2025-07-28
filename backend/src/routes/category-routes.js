import { Router } from 'express';

import {
  getCategories,
  searchCategoriesByName,
  createCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = Router();

router.get('/', getCategories);
router.get('/search/:name', searchCategoriesByName);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
