import App from './App'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            
        ]
        
    }
])

export default routes