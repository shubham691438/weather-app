import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
     
     <div className='flex justify-between'>
        <div className='fixed top-5 right-5'>
        <div>
            <Link to='/register'><button type="button" class="rounded-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>  </Link> 
            <Link to='/login'><button type="button" class="rounded-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>  </Link>
        </div>
        </div>
        <div className='fixed top-5 left-5'>
        <div>
        <Link to="/dashboard" ><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Dashboard</button>  </Link>
        <Link to="/" ><button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Home</button>  </Link>
        </div>
     </div>
   </div>
  )
}

export default Navbar