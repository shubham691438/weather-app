import App from './App'
import './index.css'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
        
            },
           
        ]
        
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path:'/login',
        element:<Login/>
    }
    
    
])

export default routes