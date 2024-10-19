const cron = require('node-cron');
const Weather = require('../../models/WeatherModel'); // Model for storing weather data 
const DailyWeatherSummary = require

// Helper function to calculate the dominant (most frequent) weather condition
const getDominantCondition = (weatherData) => {
    const conditionCount = weatherData.reduce((acc, data) => {
        acc[data.mainCondition] = (acc[data.mainCondition] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(conditionCount).reduce((a, b) => conditionCount[a] > conditionCount[b] ? a : b);
};

// Scheduler to run at midnight (0 0 * * * => At 00:00 every day)
cron.schedule('*/1 * * * *', async () => {
    console.log('Calculating daily weather summary...');

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Get distinct cities from the weather collection
    const cities = await Weather.distinct('city');

    for (const city of cities) {
        // Fetch all weather data for the city from the current day
        const weatherData = await Weather.find({
            city,
            timeOfData: { $gte: today, $lt: tomorrow }
        });

        if (weatherData.length === 0) {
            console.log(`No weather data for ${city} today.`);
            continue;
        }

        // Calculate daily aggregates
        const avgTemperature = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length;
        const maxTemperature = Math.max(...weatherData.map(data => data.temperature));
        const minTemperature = Math.min(...weatherData.map(data => data.temperature));
        const dominantCondition = getDominantCondition(weatherData);

        // Save the summary to the DailyWeatherSummary collection
        const summary = new DailyWeatherSummary({
            city,
            date: today,
            avgTemperature: avgTemperature.toFixed(2),
            maxTemperature,
            minTemperature,
            dominantCondition
        });

        await summary.save();
        console.log(`Daily summary saved for ${city}`);
    }

    console.log('Daily weather summary calculation completed.');
});
