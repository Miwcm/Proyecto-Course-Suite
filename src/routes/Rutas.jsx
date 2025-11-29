import { useRoutes } from "react-router"
import Inicio from "../pages/Inicio"
import Nosotros from "../pages/Nosotros"
import Contacto from "../pages/Contacto"
import NoEncontrado from "../pages/NoEncontrado"
import Cursos from "../pages/Cursos"
import CursosCategoria from "../pages/CursosCategoria"

const Rutas = () => {

  const componenteRutas = useRoutes(
        [
            {
                path: '/',
                element: <Inicio />
            },
             {
                path: '/cursos',
                element: <Cursos />
            },
            {
                path: '/cursos/:categoria',
                element: <CursosCategoria/>
            },
            {
                path: '/nosotros',
                element: <Nosotros />
            },
            {
                path: '/contacto',
                element: <Contacto />
            },
            {
                path: '*',
                element: <NoEncontrado />
            }
        ]
    )

  return componenteRutas
   
}

export default Rutas