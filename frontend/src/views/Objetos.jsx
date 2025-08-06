import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Objetos() {
  const [objetos, setObjetos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedObjeto, setSelectedObjeto] = useState('');

  useEffect(() => {
    const fetchObjetos = async () => {
      const response = await axios.get('http://localhost:3000/api/items');
      setObjetos(response.data);
    };

    const fetchCategorias = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategorias(response.data);
    };

    fetchObjetos();
    fetchCategorias();
  }, []);

  // Función para crear un nuevo objeto
  const createObjeto = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/items', {
        ...data,
        available: true,
      });
      setObjetos((prevObjetos) => [...prevObjetos, response.data]);
      toast.success('Objeto creado exitosamente');

      setSelectedObjeto('');
      setSelectedCategoria('');
    } catch (error) {
      console.error('Error al crear objeto:', error);
      toast.error('Error al crear objeto: ' + error.message);
    }
  };

  // Función para eliminar un objeto
  const deleteObjeto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      setObjetos((prevObjetos) =>
        prevObjetos.filter((objeto) => objeto._id !== id)
      );
      toast.success('Objeto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar objeto:', error);
      toast.error(
        'Error al eliminar objeto: ' + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className='h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <form
        action='POST'
        onSubmit={(e) => {
          e.preventDefault();
          createObjeto({
            name: e.target.name.value,
            category_id: selectedCategoria,
          });
        }}
      >
        <Card className='w-auto'>
          <CardHeader>
            <CardTitle className='text-center'>Crea una nueva objeto</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent className='space-y-4'>
            <Select
              value={selectedCategoria}
              onValueChange={setSelectedCategoria}
              name='category'
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Selecciona una categoría' />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem
                    key={categoria._id}
                    value={categoria._id}
                  >
                    {categoria.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder='Nombre del objeto'
              name='name'
              disabled={!selectedCategoria}
              required
              id='name'
              value={selectedObjeto}
              onChange={(e) => setSelectedObjeto(e.target.value)}
            />
          </CardContent>

          <CardFooter>
            <Button
              className='w-full'
              type='submit'
              disabled={!selectedObjeto}
            >
              Crear objeto
            </Button>
          </CardFooter>
        </Card>
      </form>

      <ScrollArea className='h-[850px] w-[auto] rounded-md border p-4'>
        <h4 className='mb-4 text-sm leading-none font-medium'>
          Objetos existentes
        </h4>
        <Separator />
        {objetos.map((item) => (
          <Card
            key={item._id}
            className='w-full mb-4 mt-2'
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>
                Categoría: {item.category_id.name || 'Sin categoría'}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className='w-full cursor-pointer'
                variant='destructive'
                onClick={() => deleteObjeto(item._id)}
              >
                Eliminar objeto
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Objetos;
