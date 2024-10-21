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

const WeatherSummaryChart = ({ weatherData }) => {
    const chartRef = useRef(null); // Reference for the chart

    // Prepare the labels and data for the chart
    const labels = weatherData?.map(item => new Date(item.date).toLocaleDateString()) || [];
    const avgTemperatures = weatherData?.map(item => item.avgTemperature.toFixed(2)) || [];
    const maxTemperatures = weatherData?.map(item => item.maxTemperature.toFixed(2)) || [];
    const minTemperatures = weatherData?.map(item => item.minTemperature.toFixed(2)) || [];

    const data = {
        labels: labels, // Dates as labels
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: avgTemperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                
            },
            {
                label: 'Max Temperature (°C)',
                data: maxTemperatures,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                
            },
            {
                label: 'Min Temperature (°C)',
                data: minTemperatures,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            }
        ]
    };
  

    return (
        <div>
            <h3>Weather Summary Chart</h3>
            {/* Attach chartRef to the Bar component */}
            <Line ref={chartRef} data={data} />
        </div>
    );
};

export default WeatherSummaryChart;
