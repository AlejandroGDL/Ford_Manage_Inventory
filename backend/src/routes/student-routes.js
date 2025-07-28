import { Router } from 'express';

import {
  getStudents,
  searchStudentByName,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller.js';

const router = Router();

router.get('/', getStudents);
router.get('/search/:name', searchStudentByName);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
