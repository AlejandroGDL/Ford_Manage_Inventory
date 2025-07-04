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
import { Input } from '../components/ui/input';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { Separator } from '../components/ui/separator';
import { Label } from '@/components/ui/label';

function Prestamos() {
  const [date, setDate] = useState(new Date());

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

        <CardContent className='space-y-4 flex flex-col justify-center items-center'>
          <div className='flex flex-row w-full justify-between items-center gap-4'>
            <Input
              className='w-[48%]'
              placeholder='Ingrese el ID del alumno'
            />
            <Label className='w-[52%]'>Nombre del alumno</Label>
          </div>

          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona una categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Laboratorio de computo</SelectItem>
              <SelectItem value='dark'>Juegos de mesa</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona un objeto' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Computadora 1</SelectItem>
              <SelectItem value='dark'>Computadora 2</SelectItem>
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
          <Button>Realizar préstamo</Button>
          <Button className='ml-2'>Cancelar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Prestamos;
