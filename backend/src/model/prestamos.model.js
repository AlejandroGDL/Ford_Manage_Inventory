import mongoose from 'mongoose';

const prestamosSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  loan_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Validar que la fecha de retorno sea futura
        return value > this.loan_date;
      },
      message: 'La fecha de retorno debe ser posterior a la fecha de préstamo',
    },
  },
});

export default mongoose.model('Prestamo', prestamosSchema);
