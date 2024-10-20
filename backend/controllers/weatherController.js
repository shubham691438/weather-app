const DailyWeatherSummary = require('../models/DailyWeatherSummaryModel.js');
const Weather = require('../models/WeatherModel.js');

const getWeatherSummaryByDateAndCity = async (req, res) => {
    try {
        const { city, date } = req.params;

        // Convert the date parameter into a Date object
        const inputDate = new Date(date);

        
        const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));  // 00:00:00
        const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));  // 23:59:59

       
        const summary = await DailyWeatherSummary.findOne({
            city,
            date: {
                $gte: startOfDay, 
                $lte: endOfDay     
            }
        });

        if (!summary) {
            return res.status(404).json({ message: 'Summary not found' });
        }

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLatestWeatherByCity = async (req, res) => {
    try{
        const { city } = req.params;
        const latestWeather = await Weather.findOne({ city }).sort({ timeOfData: -1 });
        res.status(200).json(latestWeather);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = { getWeatherSummaryByDateAndCity,getLatestWeatherByCity };
