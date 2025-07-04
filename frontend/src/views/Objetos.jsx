import {
  Card,
  CardContent,
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

function Objetos() {
  return (
    <div className='h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div>
        <Card className='w-auto'>
          <CardHeader>
            <CardTitle className='text-center'>Crea una nueva objeto</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent className='space-y-4'>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Selecciona una categoría' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='light'>Laboratorio de computo</SelectItem>
                <SelectItem value='dark'>Juegos de mesa</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder='Nombre del objeto' />
          </CardContent>

          <CardFooter>
            <Button className='w-full'>Crear objeto</Button>
          </CardFooter>
        </Card>
      </div>

      <ScrollArea className='h-[850px] w-[auto] rounded-md border p-4'>
        <h4 className='mb-4 text-sm leading-none font-medium'>
          Objetos existentes
        </h4>
        <Separator />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Card
            key={item}
            className='w-full mb-4 mt-2'
          >
            <CardHeader>
              <CardTitle>[Nombre del objeto]</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button
                className='w-full cursor-pointer'
                variant='destructive'
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
