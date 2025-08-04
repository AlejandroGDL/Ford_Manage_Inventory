import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [newCategoria, setNewCategoria] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategorias(response.data);
    };

    fetchCategorias();
  }, []);

  // Función para crear una nueva categoría
  const createCategoria = async (name) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/categories',
        { name }
      );
      setCategorias((prevCategorias) => [...prevCategorias, response.data]);
      setNewCategoria('');
      toast.success('Categoría creada exitosamente');
    } catch (error) {
      console.error('Error al crear categoría:', error);
      toast.error('Error al crear categoría: ' + error.message);
    }
  };

  // Función para eliminar una categoría
  const deleteCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      setCategorias((prevCategorias) =>
        prevCategorias.filter((categoria) => categoria._id !== id)
      );
      toast.success('Categoría eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      toast.error('Error al eliminar categoría: ' + error.message);
    }
  };

  return (
    <div className='h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <form
        action='POST'
        onSubmit={(e) => {
          e.preventDefault();
          createCategoria(newCategoria);
        }}
      >
        <Card className='w-auto'>
          <CardHeader>
            <CardTitle className='text-center'>
              Crea una nueva categoría
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <Input
              placeholder='Nombre de la categoría'
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              type='submit'
            >
              Crear categoría
            </Button>
          </CardFooter>
        </Card>
      </form>

      <ScrollArea className='h-[850px] w-[auto] rounded-md border p-4'>
        <h4 className='mb-4 text-sm leading-none font-medium'>
          Categorias existentes
        </h4>
        <Separator />
        {categorias.map((item) => (
          <Card
            key={item._id}
            className='w-full mb-4 mt-2'
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className='w-full cursor-pointer'
                variant='destructive'
                onClick={() => deleteCategoria(item._id)}
              >
                Eliminar categoría
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Categorias;
