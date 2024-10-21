import React, { useState, useEffect } from 'react';
import WeatherSummaryChart from '../components/WeatherSummaryChart';

const Dashboard = () => {
    const [city, setCity] = useState('bangalore');
    const [weatherSummaryData, setWeatherSummaryData] = useState([]);
    const [days, setDays] = useState(7);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchWeatherSummaryData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/weather/weatherSummaryHistory/${city}/${days}`);
                const data = await response.json();
                console.log(data);
                setWeatherSummaryData(data);
            } catch (error) {
                console.error('Error fetching weather summary data:', error);
            }
        };

        fetchWeatherSummaryData();
    }, [city, days]);

    return (
        <div>
            <h1>Weather Dashboard</h1>
            { weatherSummaryData.length>0 && ( <WeatherSummaryChart weatherData={weatherSummaryData} />) }
        </div>
    );
};

export default Dashboard;
