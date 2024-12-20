import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import 'chart.js/auto'


ChartJs.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const WeatherSummaryChart = ({ data ,title}) => {
    const chartRef = useRef(null); // Reference for the chart

   

    const options={
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            title: {
                display: true,
                text: title ,
                padding: {
                    top: 10,
                    bottom: 20
                },
                align:'center'
                
            },
            legend: {
                position: 'bottom',
                align:'start',
                labels:{
                    boxWidth:10,
                    font:{
                        weight:'bold'
                    },
                },

            },
        }    
    }
  

    return (
        <div className='h-[230px] p-5  justify-between flex rounded-3xl shadow-2xl cursor-pointer transform ease-in-out bg-white/20 duration-500 backdrop-blur-sm   hover:scale-[105%]'>
            {/* Attach chartRef to the Bar component */}
            <Line ref={chartRef} data={data} options={options}  />
        </div>
    );
};

export default WeatherSummaryChart;
