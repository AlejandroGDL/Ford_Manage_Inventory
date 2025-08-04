import items from '../model/items.model.js';

export const getItems = async (req, res) => {
  try {
    const itemsList = await items.find().populate('category_id');
    res.status(200).json(itemsList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

export const searchItemsByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res
      .status(400)
      .json({ message: 'Name query parameter is required' });
  }
  try {
    const itemsList = await items.find({
      name: { $regex: name, $options: 'i' },
    });
    res.status(200).json(itemsList);
  } catch (error) {
    res.status(500).json({ message: 'Error searching items', error });
  }
};

export const createItem = async (req, res) => {
  const newItem = new items(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await items.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await items.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};

export const searchItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res
      .status(400)
      .json({ message: 'Category ID query parameter is required' });
  }
  try {
    const itemsList = await items.find({ category_id: categoryId });
    res.status(200).json(itemsList);
  } catch (error) {
    res.status(500).json({ message: 'Error searching items', error });
  }
};
