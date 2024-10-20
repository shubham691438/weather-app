import React from 'react'
import thermometerIcon from '../assets/thermometer.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'

const WeatherSummary = () => {
  return (
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
  )
}

export default WeatherSummary