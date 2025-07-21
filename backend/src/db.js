import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const dbName = 'ford_inventory_system'; // Nombre fijo de la base de datos
    const dbURI =
      process.env.MONGODB_URI ||
      `mongodb+srv://escuelaford84:bRmKTssQWi7PYB1b@forddb.lyp9eme.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=FordDB`;
    await mongoose.connect(dbURI);
    console.log(`Conectado a la base de datos: ${dbName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
