import app from './app.js';
import { connectDB } from './db.js';

try {
  await connectDB();
  const Port = process.env.PORT || 3000;
  app.listen(Port, () => {
    console.log(`Servidor escuchando en el puerto ${Port}`);
  });
} catch (error) {
  console.error('Error al cargar dotenv:', error);
}
