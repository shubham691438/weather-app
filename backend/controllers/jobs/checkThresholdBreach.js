const User = require('../../models/UserModel');
const Weather = require('../../models/WeatherModel');

const checkThresholdBreach = async (mainCondition, city) => {
    try {
        // Fetch users from the specified city
        const users = await User.find({ city });

        for (const user of users) {
            // Check for temperature threshold breach
            if (await checkConsecutiveThreshold(user.thresholds.temperature, user.thresholds.consecutiveThreshold, city)) {
                console.log(`Temperature Threshold breached for ${city} for user ${user.name}!`);
            }

            // Check for condition threshold breach
            if (user.thresholds.conditions.includes(mainCondition)) {
                console.log(`Condition Threshold breached for ${city} for user ${user.name}!`);
            }
        }
    } catch (err) {
        console.error('Error checking thresholds:', err);
    }
};

const checkConsecutiveThreshold = async (thresholdTemp, consecutiveThreshold, city) => {
    try {
        // Fetch the last 'consecutiveThreshold' number of weather data for the city
        const weatherData = await Weather.find({ city }).sort({ timeOfData: -1 }).limit(consecutiveThreshold);

        // Check if the temperature exceeds the threshold for the specified number of consecutive times
        let count = 0;
        for (const data of weatherData) {
            if (data.temperature > thresholdTemp) {
                count++;
            }
        }


        // Return true if the threshold is breached for consecutive updates
        return count >= consecutiveThreshold;
    } catch (err) {
        console.error('Error checking consecutive temperature threshold:', err);
        return false;
    }
};

module.exports = checkThresholdBreach
