import { useState,useEffect } from 'react'
import bgVideo from './assets/bgVideo.mp4'
import icon from './assets/icon.png'
import { Link, Outlet } from 'react-router-dom'
import './App.css'

// import Home from './pages/Home'

function App() {
  const [city, setCity] = useState('bangalore');
  const [searchCity, setSearchCity] = useState('');



  const handleChange = (e) => {
    e.preventDefault();
    setSearchCity(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchCity);
  }


 
  return (
    <div>
       {/* Background Video */}
       <video autoPlay muted loop id="backgroundVideo">
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Navbar */}
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

      <div>
        <div class="flex max-w-md mx-auto items-center justify-center">
          <h1 class="text-white font-bold text-2xl">Weather Me</h1>
          <img src={icon} alt="" class="w-14 h-14" srcset="" />
        </div>

        
        
        <form
          class="flex max-w-md mx-auto items-center justify-center gap-2"
        >
          <input
            type="text"
            name="city"
            placeholder="Enter a city..."
            value={searchCity}
            onChange={handleChange}
            required
            class="py-2 px-3 w-full rounded-full bg-white text-black text-lg outline outline-2 backdrop-blur-lg ease-in-out duration-300 outline-white/70 focus:bg-white/20"
          />
          
          <button onClick={handleSearch} class=" p-2.5  font-black h-full text-2xl text-white bg-white/50  hover:bg-slate-200   rounded-full hover:border-sky-100">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </form> 
      </div>

      <Outlet context={city}/>

      
    
    </div>
    
  )
}

export default App
