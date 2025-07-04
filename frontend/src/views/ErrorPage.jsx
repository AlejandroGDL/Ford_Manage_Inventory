import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100dvh',
            width: '100dvw',
            textAlign: 'center',
            gap: '1rem',
        }
    }>
      <h1>¡Oops!</h1>
      <p>Ocurrio un error inesperado. ¡Intenta regresar a la página principal!</p>
        <Link to="/">
            <Button>Regresar</Button>
        </Link>
    </div>
  );
}