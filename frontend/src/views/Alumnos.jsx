import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog"

function Alumnos() {
  return (
    <div className="h-full w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Crear nuevo alumno</CardTitle>
            <CardDescription>Registra un nuevo alumno para poder realizar préstamos</CardDescription>
            <Separator/>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="email">Nombre del alumno</Label>
              <Input type="text" id="email" placeholder="Nombre" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="apellidos">Apellidos del alumno</Label>
              <Input type="text" id="apellidos" placeholder="Apellidos" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="salon">Salón del alumno</Label>
              <Input type="text" id="salon" placeholder="Salón" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="año">Año en curso del alumno</Label>
              <Input type="text" id="año" placeholder="Año" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Crear alumno</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card className="w-auto flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Buscar alumno</CardTitle>
            <Separator/>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto">
            <Input className="mb-4" placeholder="Buscar alumno por nombre o ID" />
            <Dialog>
              <DialogTrigger className="w-full">
                <Button className="w-full">Buscar</Button>
              </DialogTrigger>

              <DialogContent className={"flex flex-col items-center"}>
                <DialogHeader className={"flex flex-col items-center"}>
                  <DialogTitle>[Nombre del alumno]</DialogTitle>
                  <DialogDescription>
                    Edita los detalles del alumno o elimina su registro.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="email">Nombre del alumno</Label>
                  <Input type="text" id="email" placeholder="Nombre" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="apellidos">Apellidos del alumno</Label>
                  <Input type="text" id="apellidos" placeholder="Apellidos" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="salon">Salón del alumno</Label>
                  <Input type="text" id="salon" placeholder="Salón" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="año">Año en curso del alumno</Label>
                  <Input type="text" id="año" placeholder="Año" />
                </div>

                <DialogFooter>
                  <Button variant="secondary">Guardar cambios</Button>
                  <Separator orientation="vertical" className="mx-2" />

                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button variant="destructive" className="w-full">Eliminar alumno</Button>
                    </DialogTrigger>

                    <DialogContent className={"flex flex-col items-center"}>
                      <DialogHeader className={"flex flex-col items-center"}>
                        <DialogTitle>Estas seguro que deseas eliminar a [Nombre del alumno]?</DialogTitle>
                        <DialogDescription>
                          Esta acción no se puede deshacer.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <DialogClose className="w-full">
                          <Button className="w-full" variant="outline">Cerrar</Button>
                        </DialogClose>
                        <Separator orientation="vertical" className="mx-2" />
                        <Button variant="destructive">Eliminar</Button>
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
  )
}

export default Alumnos