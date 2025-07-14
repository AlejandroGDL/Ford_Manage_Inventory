import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ford_inventory';
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
