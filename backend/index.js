import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

try {
  const Port = process.env.PORT || 3000;
  app.listen(Port, () => {
    console.log(`Servidor escuchando en el puerto ${Port}`);
  });
} catch (error) {
  console.error('Error al cargar dotenv:', error);
}
