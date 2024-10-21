import App from './App'
import './index.css'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>

            }
        ]
        
    },
    
])

export default routes