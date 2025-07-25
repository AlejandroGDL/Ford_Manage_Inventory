import Prestamo from '../model/prestamos.model.js';

export const getPrestamos = async (req, res) => {
  try {
    const prestamosList = await Prestamo.find()
      .populate('item_id')
      .populate('student_id');
    res.status(200).json(prestamosList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
  }
};

export const createPrestamo = async (req, res) => {
  const { item_id, student_id, return_date } = req.body;
  const loan_date = new Date();

  try {
    // Verifica si el item está disponible
    const item = await Prestamo.model('Item').findById(item_id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (!item.available) {
      return res.status(400).json({ message: 'El objeto ya está prestado' });
    }

    const newPrestamo = new Prestamo({
      item_id,
      student_id,
      return_date,
      loan_date,
    });

    const savedPrestamo = await newPrestamo.save();
    // Set item as unavailable
    await Prestamo.model('Item').findByIdAndUpdate(item_id, {
      available: false,
    });
    res.status(201).json(savedPrestamo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error });
  }
};

export const deletePrestamo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPrestamo = await Prestamo.findByIdAndDelete(id);
    if (!deletedPrestamo) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    // Set item as available
    await Prestamo.model('Item').findByIdAndUpdate(deletedPrestamo.item_id, {
      available: true,
    });
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error });
  }
};

export const searchPrestamos = async (req, res) => {
  const { query } = req;
  try {
    const results = await Prestamo.find({
      $or: [
        { item_id: { $regex: query, $options: 'i' } },
        { student_id: { $regex: query, $options: 'i' } },
      ],
    })
      .populate('item_id')
      .populate('student_id');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching loans', error });
  }
};
