const cron = require('node-cron');
const axios = require('axios');
const Weather = require('../../models/WeatherModel');
const checkThresholdBreach = require('./checkThresholdBreach');

require('dotenv').config()


const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Function to fetch weather data for a city
const fetchWeatherData = async (city) => {
  try {
    const coordintes= await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
    const lat=coordintes.data[0].lat,lon=coordintes.data[0].lon;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
    const weatherData = response.data;

    const tempCelsius = weatherData.main.temp - 273.15;
    const feelsLikeCelsius = weatherData.main.feels_like - 273.15;

    

    // Save the weather data to the database
    const weather = new Weather({
      city,
      temperature: tempCelsius,
      feelsLike: feelsLikeCelsius,
      mainCondition: weatherData.weather[0].main,
      timeOfData: new Date(weatherData.dt * 1000),
    });

    weather.save().then(() => {

        console.log(`Weather data for ${city}:`);
        console.log(`Temperature: ${tempCelsius.toFixed(2)}°C`);
        console.log(`Feels like: ${feelsLikeCelsius.toFixed(2)}°C`);
        console.log(`Main Condition: ${weatherData.weather[0].main}`);
        console.log(`Time of Data: ${new Date(weatherData.dt * 1000)}`);
        console.log('Weather data saved to the database');
        console.log('---------------------------------------');

        checkThresholdBreach(weatherData.weather[0].main,city);
         
    }).catch((error) => {
      console.error('Error saving weather data to the database:', error.message);})
     
    
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error.message);
  }
};

// Function to fetch weather data for all cities
const fetchWeatherForAllCities = () => {
  cities.forEach(city => {
    fetchWeatherData(city);
  });
};

// fetchWeatherForAllCities();
// Schedule the task to run every 5 minutes
cron.schedule('*/1 * * * *', () => {
  console.log('Fetching weather data at:', new Date().toLocaleTimeString());
  fetchWeatherForAllCities();
  
});
