import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useEffect, useState } from 'react';

import axios from 'axios';

function Pendientes() {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    const fetchPrestamos = async () => {
      const response = await axios.get('http://localhost:3000/api/prestamos');
      setPrestamos(response.data);
    };

    fetchPrestamos();
  }, []);

  // Función para calcular días restantes
  const getDiasRestantes = (returnDate) => {
    if (!returnDate) return 'Fecha no disponible';
    const fechaRetorno = new Date(returnDate);
    if (isNaN(fechaRetorno.getTime())) return 'Fecha inválida';
    const hoy = new Date();
    // Redondear a 0h para evitar desfases por horas
    hoy.setHours(0, 0, 0, 0);
    fechaRetorno.setHours(0, 0, 0, 0);
    const diffTime = fechaRetorno - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Función para retornar un préstamo
  const return_prestamo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/prestamos/${id}`);
      // Eliminar el préstamo del estado para reflejar el cambio en la vista
      setPrestamos((prevPrestamos) =>
        prevPrestamos.filter((prestamo) => prestamo._id !== id)
      );
    } catch (error) {
      console.error('Error al retornar préstamo:', error);
    }
  };

  return (
    <div className='h-full w-full p-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {prestamos.map((item) => {
          const diasRestantes = getDiasRestantes(item.return_date);
          let badgeColor = 'default';

          if (typeof diasRestantes === 'number') {
            if (diasRestantes < 3)
              badgeColor = 'bg-red-500 text-white dark:bg-red-600'; // rojo
            else if (diasRestantes < 10)
              badgeColor = 'bg-yellow-500 text-white dark:bg-yellow-600';
            // amarillo
            else if (diasRestantes >= 11)
              badgeColor = 'bg-green-500 text-white dark:bg-green-600'; // verde
          }

          return (
            <Card
              key={item._id}
              className='w-full'
            >
              <CardHeader>
                <CardTitle>{item.student_id.name}</CardTitle>
                <CardDescription>
                  Año: {item.student_id.year} Salón: {item.student_id.lounge}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label className='block mb-2'>{item.item_id.name}</Label>
                <Badge className={badgeColor}>
                  {diasRestantes} Días restantes
                </Badge>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => return_prestamo(item._id)}
                  className='w-full'
                >
                  Retornar préstamo
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Pendientes;
