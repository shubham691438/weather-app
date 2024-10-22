import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bgVideo from '../assets/bgVideo.mp4';
import WeatherSummaryChart from '../components/WeatherSummaryChart';
import Navbar from '../components/Navbar';

const ThresholdBreachDashboard = () => {
     
    const { userId, name } = useParams();
    const [breachesPerDay, setBreachesPerDay] = useState([]);
    const [temperatureBreachesPerDay, setTemperatureBreachesPerDay] = useState([]);
    const [conditionBreachesPerDay, setConditionBreachesPerDay] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getBreaches = async () => {
            try {
                const today = new Date();
               
                const response = await fetch(`${backendUrl}/api/weather/thresholdBreaches/${userId}`);
                const breaches = await response.json();

                if (breaches.length === 0) {
                    setError(`No breaches found for the last 7 days for ${name}.`);
                    return;
                }

                console.log(breaches);

                const dayWiseBreaches = {};
                const temperatureDayWiseBreaches = {};
                const conditionDayWiseBreaches = {};

                // Initialize breach counters for each day (last 7 days)
                for (let i = 0; i <= 7; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    const dateString = date.toLocaleDateString();
                    dayWiseBreaches[dateString] = 0;
                    temperatureDayWiseBreaches[dateString] = 0;
                    conditionDayWiseBreaches[dateString] = 0;
                }

                // Count breaches per day (overall, temperature, and condition)
                breaches.forEach((breach) => {
                    const breachDate = new Date(breach.time).toLocaleDateString();

                    if (dayWiseBreaches[breachDate] !== undefined) {
                        dayWiseBreaches[breachDate] += 1;
                    }

                    // Separate counting for temperature breaches
                    if (breach.type === 'temperature' && temperatureDayWiseBreaches[breachDate] !== undefined) {
                        temperatureDayWiseBreaches[breachDate] += 1;
                    }

                    // Separate counting for condition breaches
                    if (breach.type === 'condition' && conditionDayWiseBreaches[breachDate] !== undefined) {
                        conditionDayWiseBreaches[breachDate] += 1;
                    }
                });

                // Update state with breach counts and labels
                setLabels(Object.keys(dayWiseBreaches).reverse());
                setBreachesPerDay(Object.values(dayWiseBreaches).reverse());
                setTemperatureBreachesPerDay(Object.values(temperatureDayWiseBreaches).reverse());
                setConditionBreachesPerDay(Object.values(conditionDayWiseBreaches).reverse());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getBreaches();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        setTimeout(() => {
            navigate('/dashboard');
        }, 5000);
        
        return (
            <div>
                <p className="text-red-500">{error}</p>
                <p className="text-red-500">Redirecting to dashboard...</p>
            </div>
        );
    }

    // Chart data for temperature breaches
    const temperatureData = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature Breaches Per Day',
                data: temperatureBreachesPerDay,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart data for condition breaches
    const conditionData = {
        labels: labels,
        datasets: [
            {
                label: 'Condition Breaches Per Day',
                data: conditionBreachesPerDay,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart data for overall breaches (already done)
    const overallData = {
        labels: labels,
        datasets: [
            {
                label: 'Overall Breaches Per Day',
                data: breachesPerDay,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <video autoPlay muted loop id="backgroundVideo">
                <source src={bgVideo} type="video/mp4" />
            </video>

            <Navbar/>

            <div>
                <h1>Threshold Breaches</h1>
                <div className='px-3 py-2'> 
                    <div className="grid grid-cols-1 gap-4">
                        { overallData.datasets.length > 0 && <WeatherSummaryChart data={overallData} title="Overall Breaches Per Day" /> }

                        <div className='grid grid-cols-2 gap-4'>
                        { temperatureData.datasets.length > 0 && <WeatherSummaryChart data={temperatureData} title="Temperature Breaches Per Day" /> }
                        { conditionData.datasets.length > 0 && <WeatherSummaryChart data={conditionData} title="Condition Breaches Per Day" /> }
                        </div>
                    </div>    
                </div>   
            </div>
        </div>
    );
};

export default ThresholdBreachDashboard;
