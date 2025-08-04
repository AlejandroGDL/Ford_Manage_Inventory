import { Router } from 'express';

import {
  getItems,
  searchItemsByName,
  createItem,
  updateItem,
  deleteItem,
  searchItemsByCategory,
} from '../controllers/items.controller.js';

const router = Router();

router.get('/', getItems);
router.get('/search/:name', searchItemsByName);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.get('/category/:categoryId', searchItemsByCategory);

export default router;
