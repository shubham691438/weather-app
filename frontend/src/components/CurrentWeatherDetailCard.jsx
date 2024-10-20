import React,{useState} from 'react'
import thermometerIcon from '../assets/thermometer.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import mainConditionRainIcon from '../assets/mainConditionRain.png'

const CurrentWeatherDetailCard = ({city,currTemperature,currFeelsLike,currHumidity,currMainCondition,currWindSpeed}) => {

  return (
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
        {/* <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
        >
        <img className="w-8 h-8" src={thermometerIcon} alt="temperature icon" />
            <div className="">
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{currTemperature} °C</p>
            <p className="text-sm text-white text-right">Temperature</p>
            <p className="text-sm text-white text-right">Feelslike : <span className='text-red-400 font-bold'>{currFeelsLike}</span></p>
            </div>
        </div> */}
        
        {/* Main Condition */}
        <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
        >
            <img className="w-8 h-8 "  src={mainConditionRainIcon} alt="wind icon" />
            <div className="">
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{currMainCondition}</p>
            <p className="text-sm text-white text-right">Condition</p>
            </div>
        </div>

        {/* Wind Speed */}
        <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
        >
            <img className="w-8 h-8 "  src={windIcon} alt="wind icon" />
            <div className="">
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{currWindSpeed} m/s</p>
            <p className="text-sm text-white text-right">Wind</p>
            </div>
        </div>

        {/* Humidity */}
        <div
            className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6"
        >
            <img className="w-8 h-8" src={humidityIcon} alt="humidity icon" />
            <div className="">
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{currHumidity} %</p>
            <p className="text-sm text-white text-right">Humidity</p>
            </div>
        </div>
        </div>
  </div>
  )
}

export default CurrentWeatherDetailCard