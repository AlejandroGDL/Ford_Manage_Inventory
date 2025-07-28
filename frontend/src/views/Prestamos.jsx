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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

function Prestamos() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [date, setDate] = useState(new Date());

  const [categoria, setCategoria] = useState('');

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
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Busca un alumno'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput
                    placeholder='Escribe el nombre...'
                    className='h-9'
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value === framework.value
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
          </div>

          <Select
            value={categoria}
            onValueChange={setCategoria}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona una categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Laboratorio de computo</SelectItem>
              <SelectItem value='dark'>Juegos de mesa</SelectItem>
            </SelectContent>
          </Select>

          <Select disabled={!categoria}>
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
