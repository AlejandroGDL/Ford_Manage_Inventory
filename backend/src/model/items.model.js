import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
