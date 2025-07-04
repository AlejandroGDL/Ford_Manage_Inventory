import {createBrowserRouter} from 'react-router-dom';

import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';

import Prestamos from './views/Prestamos';
import Pendientes from './views/Pendientes';
import Categorias from './views/Categorias';
import Alumnos from './views/Alumnos';
import Objetos from './views/Objetos';

import Login from './views/Login';

import ErrorPage from './views/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { 
                index:true,
                element: <Prestamos/>,
                errorElement: <ErrorPage/>
            }
            ,{
                path: '/pendientes',
                element: <Pendientes/>,
                errorElement: <ErrorPage/>
            }
            ,{
                path: '/categorias',
                element: <Categorias/>,
                errorElement: <ErrorPage/>
            }
            ,{
                path: '/alumnos',
                element: <Alumnos/>,
                errorElement: <ErrorPage/>
            }
            ,{
                path: '/objetos',
                element: <Objetos/>,
                errorElement: <ErrorPage/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { 
                index:true, 
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }
    
])

export default router