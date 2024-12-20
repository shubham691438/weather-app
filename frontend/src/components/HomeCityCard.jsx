import React from 'react'
import smilySun from '../assets/smilySun.png'

const HomeCityCard = ({currUnit,city,currTemperature,currFeelsLike}) => {
  return (
    <div
        className="py-5 px-10  justify-between flex rounded-3xl shadow-2xl cursor-pointer transform ease-in-out bg-white/20 duration-500 backdrop-blur-sm   hover:scale-[105%]"
    >
        <div id="left" className="flex flex-col">
        <div id="top" className="mb-6">
            <p className="font-bold text-5xl text-white">{currTemperature.toFixed(0)}{currUnit=='K'?' ':'°'}{currUnit}</p>
            <p className="font-semibold text-md text-white">Feels Like: <span>{currFeelsLike.toFixed(0)} {currUnit=='K'?' ':'°'}{currUnit}</span></p>
            {/* <p className="font-semibold text-md text-white">Now</p> */}
            
        </div>
        <p className="font-semibold text-xl text-white">{city}</p>
        <p>Current Weather Update</p>
        </div>
        <div id="right" className="flex justify-end items-center">
        <img className="w-28 h-28" src={smilySun} alt="weather icon" />
        </div>
    </div>
  )
}

export default HomeCityCard