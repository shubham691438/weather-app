import React from 'react';
import { Bar } from 'react-chartjs-2';

const WeatherSummary = ({ weatherData }) => {
    // Data for chart
    const data = {
        labels: ['Average Temp', 'Max Temp', 'Min Temp'],
        datasets: [{
            label: 'Temperature (°C)',
            data: [
                weatherData.avgTemp, 
                weatherData.maxTemp, 
                weatherData.minTemp
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
        }]
    };

    return (
        <div>
            <h3>Daily Weather Summary for {weatherData.city}</h3>
            <Bar data={data} />
            <p><strong>Dominant Condition:</strong> {weatherData.dominantCondition}</p>
        </div>
    );
};

export default WeatherSummary;
