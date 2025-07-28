import Category from '../model/category.model.js';
import Item from '../model/items.model.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};

export const searchCategoriesByName = async (req, res) => {
  try {
    const { name } = req.params;
    const categories = await Category.find({
      name: { $regex: name || '', $options: 'i' },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error searching categories' });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Verifica si hay items asociados a la categoría antes de eliminar
    const mongoose = await import('mongoose');
    const categoryId = mongoose.Types.ObjectId.isValid(id)
      ? new mongoose.Types.ObjectId(id)
      : id;
    const itemsCount = await Item.countDocuments({ category: categoryId });
    if (itemsCount > 0) {
      return res.status(400).json({
        message:
          'No se puede eliminar la categoría porque tiene items asociados.',
      });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};
