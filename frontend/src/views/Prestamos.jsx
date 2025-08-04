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
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { Separator } from '../components/ui/separator';
import { Label } from '@/components/ui/label';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';

import axios from 'axios';
import { toast } from 'sonner';

function Prestamos() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [date, setDate] = useState(new Date());

  const [objetos, setObjetos] = useState([]);
  const [selectedObjeto, setSelectedObjeto] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');

  const [alumnos, setAlumnos] = React.useState([]);

  const searchAlumno = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/students/search/${searchTerm}`
      );
      setAlumnos(response.data);
      console.log('Alumnos encontrados:', response.data);
    } catch (error) {
      console.error('Error buscando alumno:', error);
    }
  };

  React.useEffect(() => {
    const fetchCategorias = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategorias(response.data);
    };

    fetchCategorias();
  }, []);

  const searchObjeto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/items/category/${selectedCategoria}`
      );
      setObjetos(response.data);
      console.log('Objetos encontrados:', response.data);
    } catch (error) {
      console.error('Error buscando objeto:', error);
    }
  };

  const createPrestamo = async (item_id, student_id, return_date) => {
    const formattedDate = return_date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(date.getDate()).padStart(2, '0')}`
      : null;

    try {
      const response = await axios.post('http://localhost:3000/api/prestamos', {
        item_id: item_id,
        student_id: student_id,
        return_date: formattedDate,
      });
      toast.success('Préstamo creado exitosamente');
      setValue('');
      setSelectedObjeto('');
      setDate(new Date());
      setSelectedCategoria('');
      setObjetos([]);
      setAlumnos([]);
    } catch (error) {
      console.error('Error creando préstamo:', error);
    }
  };

  return (
    <div className='h-full w-full'>
      <Card className='w-[500px] mx-auto mt-10 p-6'>
        <CardHeader>
          <CardTitle>Prestamos</CardTitle>
          <CardDescription>
            En esta página se podrán realizar préstamos a los alumnos
            registrados
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-2 flex flex-col justify-center items-center'>
          <div className='flex flex-row w-full justify-between items-center '>
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between'
                >
                  {value
                    ? alumnos.find((alumno) => alumno.name === value)?.name
                    : 'Busca un alumno'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput
                    placeholder='Escribe el nombre...'
                    className='h-9'
                    onValueChange={searchAlumno}
                  />
                  <CommandList>
                    <CommandEmpty>Alumno no encontrado.</CommandEmpty>
                    <CommandGroup>
                      {alumnos.map((alumno) => (
                        <CommandItem
                          key={alumno._id}
                          value={alumno.name}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === alumno._id ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            checked={alumno._id === value}
                            onCheckedChange={(checked) => {
                              setValue(checked ? alumno._id : '');
                            }}
                          />
                          {alumno.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              value === alumno._id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Select
            value={selectedCategoria}
            onValueChange={setSelectedCategoria}
            onOpenChange={() => {
              if (selectedCategoria) {
                searchObjeto(selectedCategoria);
              }
            }}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona una categoría' />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedObjeto}
            onValueChange={setSelectedObjeto}
            disabled={!selectedCategoria}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona un objeto' />
            </SelectTrigger>
            <SelectContent>
              {objetos.map((objeto) => (
                <SelectItem
                  key={objeto._id}
                  value={objeto._id}
                >
                  {objeto.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator />

          <Label>Selecciona la fecha para regresar el objeto</Label>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-lg border'
          />

          <Separator />
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            disabled={!value || !selectedObjeto || !date}
            onClick={() => {
              const alumno = alumnos.find((a) => a.name === value);
              createPrestamo(selectedObjeto, alumno._id, date);
            }}
          >
            Realizar préstamo
          </Button>
          <Button className='ml-2'>Cancelar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Prestamos;
