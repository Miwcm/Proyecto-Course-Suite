import { useRoutes } from "react-router-dom"
import Inicio from "../pages/Inicio"
import Nosotros from "../pages/Nosotros"
import Contacto from "../pages/Contacto"
import NoEncontrado from "../pages/NoEncontrado"
import Cursos from "../pages/Cursos"
import CursosCategoria from "../pages/CursosCategoria"
import Registro from "../pages/Registro"
import Login from "../pages/Login"
import Perfil from "../pages/Perfil"

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
                path: '/registro',
                element: <Registro />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/perfil',
                element: <Perfil />
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