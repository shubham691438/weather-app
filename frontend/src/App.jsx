import { useState } from 'react'
import bgVideo from './assets/bgVideo.mp4'
import icon from './assets/icon.png'
import smilySun from './assets/smilySun.png'
import thermometerIcon from './assets/thermometer.png'
import windIcon from './assets/wind.png'
import humidityIcon from './assets/humidity.png'
import rainIcon from './assets/rain.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       {/* Background Video */}
       <video autoPlay muted loop id="backgroundVideo">
          <source src={bgVideo} type="video/mp4" />
        </video>

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
            required
            class="py-2 px-3 w-full rounded-full bg-white text-white text-lg outline outline-2 backdrop-blur-lg ease-in-out duration-300 outline-white/70 focus:bg-white/20"
          />
          
          <button type="submit" class=" p-2.5  font-black h-full text-2xl text-white bg-white/50  hover:bg-slate-200   rounded-full hover:border-sky-100">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </form>
        
      </div>

      <div>

      <div className='flex justify-between'>
          {/* Home city card */}
          <div
            className="mt-10 py-5 px-10 w-[385px] justify-between flex rounded-3xl shadow-2xl cursor-pointer transform ease-in-out bg-white/20 duration-500 backdrop-blur-sm   hover:scale-[105%]"
          >
            <div id="left" className="flex flex-col">
              <div id="top" className="mb-6">
                <p className="font-bold text-5xl text-white">{"25"}°C</p>
                <p className="font-semibold text-md text-white">Now</p>
              </div>
              <p className="font-semibold text-xl text-white">{"Bangalore"}</p>
            </div>
            <div id="right" className="flex justify-end items-center">
              <img className="w-28 h-28" src={smilySun} alt="weather icon" />
            </div>
          </div>

      {/* Weather Details */}
      <div
        className="mt-10 py-5 px-10 w-[385px] justify-between flex rounded-3xl shadow-2xl cursor-pointer transform ease-in-out bg-white/20 duration-500 backdrop-blur-sm   hover:scale-[105%]"
      >
        <div id="left" className="flex flex-col justify-start">
          {/* Icon */}
          <img className="w-12 h-12 " src={rainIcon} alt="weather icon" />
          {/* Weather */}
          <p className="font-bold text-4xl text-white">{"Rain"}</p>
          {/* Description */}
          <p className="font-semibold text-white">{"It will rainy"}</p>
        </div>

        <div id="right" className="w-1/2 flex-col space-y-2">
          {/* Temperature */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
          <img className="w-8 h-8" src={thermometerIcon} alt="temperature icon" />
            <div className="">
              <p className="font-bold text-2xl text-right text-[#ff5a00]">{"25"} °C</p>
              <p className="text-sm text-white text-right">Temperature</p>
            </div>
          </div>

          {/* Wind Speed */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
            <img className="w-8 h-8 "  src={windIcon} alt="wind icon" />
            <div className="">
              <p className="font-bold text-2xl text-right text-[#ff5a00]">{"12"} m/s</p>
              <p className="text-sm text-white text-right">Wind</p>
            </div>
          </div>

          {/* Humidity */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
            <img className="w-8 h-8" src={humidityIcon} alt="humidity icon" />
            <div className="">
              <p className="font-bold text-2xl text-right text-[#ff5a00]">{"65"} %</p>
              <p className="text-sm text-white text-right">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </div>  
    {/* Weather summary */}
    <div
       className="flex  justify-between bg-[#0198afb6] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl w-[800px] mt-5"
      >
        <div className='flex flex-col'>
          <p class="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">Weather Summary for Yesterday</p>
          
          <div id="left" className="mt-6 flex  justify-center">
            {/* Icon */}
            <img className="w-12 h-12 " src={rainIcon} alt="weather icon" />

            <div>
              {/* Weather */}
              <p className="font-bold text-4xl text-white">{"Rain"}</p>
              {/* Condition */}
              <p className="font-semibold text-white">Dominant Weather Condition</p>
            </div>
          </div>
        </div>

        <div id="right" className="w-1/2 flex-col space-y-2">
          {/* Temperature */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
          <img className="w-8 h-8" src={thermometerIcon} alt="temperature icon" />
            <div className="">
            <div className='flex justify-end'>
              <span className="font-bold text-2xl text-right text-[#ff5a00]">{"25"} °C</span>
              <div className="flex flex-col text-right ml-2">
                <span className="text-sm text-white">Min: {"15"} °C</span>
                <span className="text-sm text-white">Max: {"30"} °C</span>
              </div>
            </div>
              <p className="text-sm text-white text-right">Average Temperature</p>
            </div>
          </div>

          {/* Wind Speed */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
            <img className="w-8 h-8 "  src={windIcon} alt="wind icon" />
            <div className="">
              <p className="font-bold text-2xl text-right text-[#ff5a00]">{"12"} m/s</p>
              <p className="text-sm text-white text-right">Averge Wind</p>
            </div>
          </div>

          {/* Humidity */}
          <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
          >
            <img className="w-8 h-8" src={humidityIcon} alt="humidity icon" />
            <div className="">
              <p className="font-bold text-2xl text-right text-[#ff5a00]">{"65"} %</p>
              <p className="text-sm text-white text-right">Average Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
