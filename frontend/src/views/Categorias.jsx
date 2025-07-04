import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"

import { ScrollArea } from "@/components/ui/scroll-area"

function Categorias() {
  return (
    <div className="h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <Card className="w-auto">
          <CardHeader>
            <CardTitle className="text-center">Crea una nueva categoría</CardTitle>
            <Separator/>
          </CardHeader>
          <CardContent>
            <Input placeholder="Nombre de la categoría" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Crear categoría</Button>
          </CardFooter>
        </Card>
      </div>

      <ScrollArea className="h-[850px] w-[auto] rounded-md border p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Categorias existentes</h4>
        <Separator/>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Card key={item} className="w-full mb-4 mt-2">
            <CardHeader>
              <CardTitle>[Nombre de la categoría]</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button className="w-full cursor-pointer" variant="destructive">Eliminar categoría</Button>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

export default Categorias