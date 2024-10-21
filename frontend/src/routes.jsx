import App from './App'
import './index.css'
import Dashboard from './pages/Dashboard'
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
        
            }
        ]
        
    },
    
    
])

export default routes