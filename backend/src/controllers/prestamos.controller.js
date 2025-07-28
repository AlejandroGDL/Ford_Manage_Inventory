import Prestamo from '../model/prestamos.model.js';

export const getPrestamos = async (_req, res) => {
  try {
    const prestamosList = await Prestamo.find()
      .populate({ path: 'item_id' })
      .populate({ path: 'student_id' });

    // Ordenar por la cercanía de return_date (más próximos primero)
    prestamosList.sort((a, b) => {
      const dateA = new Date(a.return_date);
      const dateB = new Date(b.return_date);
      return dateA - dateB;
    });

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
  const { name } = req.params;
  try {
    // Buscar préstamos y poblar item y estudiante
    const prestamos = await Prestamo.find()
      .populate({ path: 'item_id', select: 'name' })
      .populate({ path: 'student_id', select: 'name' });

    // Filtrar por nombre del item o nombre del estudiante
    const results = prestamos.filter(
      (p) =>
        p.item_id?.name?.toLowerCase().includes(name?.toLowerCase() || '') ||
        p.student_id?.name?.toLowerCase().includes(name?.toLowerCase() || '')
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching loans', error });
  }
};
