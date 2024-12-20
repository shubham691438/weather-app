const DailyWeatherSummary = require('../models/DailyWeatherSummaryModel.js');
const Weather = require('../models/WeatherModel.js');
const { format, subDays, isSameDay, parseISO } = require('date-fns');
const ThresholdBreach = require('../models/ThresholdBreachModel.js');

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
            return res.status(201).json({ message: 'Summary not found' });
        }

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getWeatherSummaryForLastDays = async (req, res) => {
    try {
        const { city, days } = req.params; 
       

        
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));

        
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - parseInt(days));
        const startOfPastDate = new Date(pastDate.setHours(0, 0, 0, 0)); 

   
        const data = await DailyWeatherSummary.find({
            city,
            date: {
                $gte: startOfPastDate,
                $lte: startOfToday
            }
        });
        
        // Extract unique dates using a Set
        const uniqueSummaries = data.reduce((acc, curr) => {
            const dateString = curr.date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
            if (!acc.has(dateString)) {
                acc.set(dateString, curr); // Store the first entry for each unique date
            }
            return acc;
        }, new Map());

        // Convert the Map back to an array of summaries
        const summaries = Array.from(uniqueSummaries.values());

        // console.log(summaries);

        if (!summaries || summaries.length === 0) {
            return res.status(404).json({ message: `No summaries found for the last ${days} days.` });
        }

        res.json(summaries);
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



// Function to get threshold breaches for the last 7 days
const getBreachesForLast7Days = async (req,res) => {
    try {
        const {userId} = req.params;
        const today = new Date();
        const sevenDaysAgo = subDays(today, 7);

       
        const breaches = await ThresholdBreach.find({
            userId: userId,
            time: { $gte: sevenDaysAgo, $lte: today }
        });

        // console.log(breaches);

    
        res.status(200).json(breaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getWeatherSummaryByDateAndCity,getWeatherSummaryForLastDays,getLatestWeatherByCity,getBreachesForLast7Days };
