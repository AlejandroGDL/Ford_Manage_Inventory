import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"

function Pendientes() {
  return (
    <div className="h-full w-full p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="w-full">
            <CardHeader>
              <CardTitle>[Nombre del alumno]</CardTitle>
              <CardDescription>Año: [1] Salón: [A]</CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="block mb-2">[Objeto prestado]</Label>
              <Badge variant="default">2 Días restantes</Badge>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Retornar préstamo</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Pendientes