import Student from '../model/student.model.js';
import Loan from '../model/prestamos.model.js';

export const getStudents = async (req, res) => {
  try {
    const studentsList = await Student.find();
    res.status(200).json(studentsList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

export const createStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findOne({ student_id: id });
    if (loan) {
      return res
        .status(400)
        .json({
          message:
            'No se puede eliminar el estudiante porque tiene préstamos activos.',
        });
    }
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

export const searchStudentByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res
      .status(400)
      .json({ message: 'Name query parameter is required' });
  }
  try {
    const students = await Student.find({
      name: { $regex: name, $options: 'i' },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error searching students', error });
  }
};
