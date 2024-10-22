import React, { useState, useEffect } from 'react';
import WeatherSummaryChart from '../components/WeatherSummaryChart';
import { Link, useOutletContext } from 'react-router-dom';
import PieChart from '../components/PieChart';


const Dashboard = () => {
    const city = useOutletContext();
    const [weatherSummaryData, setWeatherSummaryData] = useState([]);
    const [days, setDays] = useState(7);
    // const [avgTemperatures, setAvgTemperatures] = useState([]);
    // const [maxTemperatures, setMaxTemperatures] = useState([]);
    // const [minTemperatures, setMinTemperatures] = useState([]);
    // const [avgHumidity, setAvgHumidity] = useState([]);
    // const [avgWindSpeed, setAvgWindSpeed] = useState([]);
    // const [dominantCondition, setDominantCondition] = useState([]);
    // const [label, setLabel] = useState([]);

    const [temperatureGraphData, setTemperatureGraphData] = useState({});
    const [humidityGraphData, setHumidityGraphData] = useState({});
    const [windSpeedGraphData, setWindSpeedGraphData] = useState({});
    const [conditionGraphData, setConditionGraphData] = useState({});

    const generateRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = Math.floor((i * 360) / numColors); // Distribute hues
            const color = `hsl(${hue}, 70%, 60%)`; // HSL color with consistent saturation and lightness
            colors.push(color);
        }
        return colors;
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchWeatherSummaryData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/weather/weatherSummaryHistory/${city}/${days}`);
                const data = await response.json();
                console.log(data);


                const labels = data?.map(item => 
                    new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                ) || [];

                const avgTemperatures = data?.map(item => item.avgTemperature.toFixed(0)) || [];
                const maxTemperatures = data?.map(item => item.maxTemperature.toFixed(0)) || [];
                const minTemperatures = data?.map(item => item.minTemperature.toFixed(0)) || [];
                const avgHumidity = data?.map(item => item.avgHumidity.toFixed(0)) || [];
                const avgWindSpeed = data?.map(item => item.avgWindSpeed.toFixed(0)) || [];
                
                

                // setAvgTemperatures(avgTemperatures);
                // setMaxTemperatures(maxTemperatures);
                // setMinTemperatures(minTemperatures);
                // setAvgHumidity(avgHumidity);
                // setAvgWindSpeed(avgWindSpeed);
                // setDominantCondition(dominantCondition);
                // setLabel(labels);

                const temperatureGraphData0 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Temperature (°C)',
                            data: avgTemperatures,
                            backgroundColor: 'rgba(75, 192, 192, 0.0)',
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
                }

                const windSpeedGraphData0 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Wind Speed (m/s)',
                            data: avgWindSpeed,
                            backgroundColor: 'rgba(75, 192, 192, 0.0)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                        }
                    ]
                }
                
                const humidityGraphData0 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Humidity (%)',
                            data: avgHumidity,
                            backgroundColor: 'rgba(75, 192, 192, 0.0)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                        }
                    ]
                }
                
                const conditionCount = data.reduce((acc, item) => {
                    acc[item.dominantCondition] = (acc[item.dominantCondition] || 0) + 1;
                    return acc;
                }, {});
                
                // Extract labels (conditions) and data (counts)
                const dominantConditionLabels = Object.keys(conditionCount);
                const dominantConditionData = Object.values(conditionCount);

                // Generate colors dynamically based on the number of dominant conditions
                const numConditions = dominantConditionLabels.length;
                const backgroundColors = generateRandomColors(numConditions);
                const borderColors = backgroundColors.map(color => color.replace('60%', '50%'));

                // Chart data configuration
                const conditionData0 = {
                    labels: dominantConditionLabels,
                    datasets: [
                        {
                            label: 'Dominant Condition',
                            data: dominantConditionData, // Counts of each weather condition
                            backgroundColor: backgroundColors, // Dynamically generated colors
                            borderColor: borderColors, // Slightly darker border colors
                            borderWidth: 1
                        }
                    ]
                };

                setTemperatureGraphData(temperatureGraphData0);
                setHumidityGraphData(humidityGraphData0);
                setWindSpeedGraphData(windSpeedGraphData0);
                setConditionGraphData(conditionData0);



                setWeatherSummaryData(data);
            } catch (error) {
                console.error('Error fetching weather summary data:', error);
            }
        };

        fetchWeatherSummaryData();
    }, [city, days]);

    return (
        <div >
            {/* <div className='fixed top-20 left-5'>
                <Link to='/dashboard'>Historical Weather Data</Link>
               
            </div> */}
            <h1>Weather Dashboard : {city}</h1>
            <div className='px-3 py-2'> 
                <div className="grid grid-cols-2 gap-4">
                    { weatherSummaryData.length>0 && ( <WeatherSummaryChart data={temperatureGraphData }  title="Historical Temperature Data"/>) }
                    { weatherSummaryData.length>0 && ( <WeatherSummaryChart data={humidityGraphData} title="Historical Humidity Data" />) }
                    { weatherSummaryData.length>0 && ( <WeatherSummaryChart data={windSpeedGraphData} title="Historical Wind Speed Data"/>) }
                    { weatherSummaryData.length>0 && ( <PieChart data={conditionGraphData} title="Historical Dominant Condition Data"/>) }
                </div>    
            </div>   
        </div>

    );
};

export default Dashboard;
