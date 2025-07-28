import { Router } from 'express';

import {
  getItems,
  searchItemsByName,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items.controller.js';

const router = Router();

router.get('/', getItems);
router.get('/search/:name', searchItemsByName);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
