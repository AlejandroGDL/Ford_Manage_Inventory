import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';

import axios from 'axios';
import { useState } from 'react';

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

function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [open, setOpen] = React.useState(false);
  var [value, setValue] = React.useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lounge, setLounge] = useState('');
  const [year, setYear] = useState('');

  const createAlumno = async (newAlumno) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/students',
        newAlumno
      );
      setAlumnos([...alumnos, response.data]);
      alert('Alumno creado exitosamente'); //CAMBIAR
      setName('');
      setEmail('');
      setLounge('');
      setYear('');
    } catch (error) {
      console.error('Error creando alumno:', error);
      alert('Error al crear el alumno');
    }
  };

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

  const TEST = (value) => {
    console.log('TEST', value);
  };

  return (
    <div className='h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newAlumno = {
            name: e.target.name.value,
            email: e.target.email.value,
            lounge: e.target.lounge.value,
            year: e.target.year.value,
          };
          createAlumno(newAlumno);
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>Crear nuevo alumno</CardTitle>
            <CardDescription>
              Registra un nuevo alumno para poder realizar préstamos
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid w-full max-w-sm items-center gap-3'>
              <Label htmlFor='name'>Nombre del alumno</Label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder='Nombre'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='grid w-full max-w-sm items-center gap-3'>
              <Label htmlFor='email'>Correo del alumno</Label>
              <Input
                type='text'
                id='email'
                name='email'
                placeholder='Correo electrónico'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='grid w-full max-w-sm items-center gap-3'>
              <Label htmlFor='lounge'>Salón del alumno</Label>
              <Input
                type='text'
                id='lounge'
                name='lounge'
                placeholder='Salón'
                onChange={(e) => setLounge(e.target.value)}
              />
            </div>

            <div className='grid w-full max-w-sm items-center gap-3'>
              <Label htmlFor='year'>Año en curso del alumno</Label>
              <Input
                type='text'
                id='year'
                name='year'
                placeholder='Año'
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              disabled={!name || !email || !lounge || !year}
            >
              Crear alumno
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div>
        <Card className='w-auto flex flex-col'>
          <CardHeader>
            <CardTitle className='text-center'>Buscar alumno</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent className='flex-1 overflow-y-auto'>
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between mb-4'
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
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {alumno.label || alumno.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              value ===
                                (alumno.value || alumno._id || alumno.id)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Dialog>
              <DialogTrigger className='w-full'>
                <Button className='w-full'>Editar o eliminar</Button>
              </DialogTrigger>

              <DialogContent className={'flex flex-col items-center'}>
                <DialogHeader className={'flex flex-col items-center'}>
                  <DialogTitle>[Nombre del alumno]</DialogTitle>
                  <DialogDescription>
                    Edita los detalles del alumno o elimina su registro.
                  </DialogDescription>
                </DialogHeader>

                <div className='grid w-full max-w-sm items-center gap-3'>
                  <Label htmlFor='email'>Nombre del alumno</Label>
                  <Input
                    type='text'
                    id='email'
                    placeholder='Nombre'
                  />
                </div>

                <div className='grid w-full max-w-sm items-center gap-3'>
                  <Label htmlFor='apellidos'>Apellidos del alumno</Label>
                  <Input
                    type='text'
                    id='apellidos'
                    placeholder='Apellidos'
                  />
                </div>

                <div className='grid w-full max-w-sm items-center gap-3'>
                  <Label htmlFor='salon'>Salón del alumno</Label>
                  <Input
                    type='text'
                    id='salon'
                    placeholder='Salón'
                  />
                </div>

                <div className='grid w-full max-w-sm items-center gap-3'>
                  <Label htmlFor='año'>Año en curso del alumno</Label>
                  <Input
                    type='text'
                    id='año'
                    placeholder='Año'
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant='secondary'
                    disabled={!name || !email || !lounge || !year}
                  >
                    Guardar cambios
                  </Button>
                  <Separator
                    orientation='vertical'
                    className='mx-2'
                  />

                  <Dialog>
                    <DialogTrigger className='w-full'>
                      <Button
                        variant='destructive'
                        className='w-full'
                      >
                        Eliminar alumno
                      </Button>
                    </DialogTrigger>

                    <DialogContent className={'flex flex-col items-center'}>
                      <DialogHeader className={'flex flex-col items-center'}>
                        <DialogTitle>
                          Estas seguro que deseas eliminar a [Nombre del
                          alumno]?
                        </DialogTitle>
                        <DialogDescription>
                          Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <DialogClose className='w-full'>
                          <Button
                            className='w-full'
                            variant='outline'
                          >
                            Cerrar
                          </Button>
                        </DialogClose>
                        <Separator
                          orientation='vertical'
                          className='mx-2'
                        />
                        <Button variant='destructive'>Eliminar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Alumnos;
