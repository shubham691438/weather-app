const ThresholdBreach = require('../../models/ThresholdBreachModel');
const User = require('../../models/UserModel');
const Weather = require('../../models/WeatherModel');
const sendAlertEmail = require('./sendAlertEmail');
require('dotenv').config();

const checkThresholdBreach = async (mainCondition, city) => {
    try {
        const users = await User.find({ city });

        for (const user of users) {
            // Check for temperature threshold breach
            if (await checkConsecutiveThreshold(user.thresholds.temperature, user.thresholds.consecutiveThreshold, city)) {
                const msg = `
                Dear user,
                Temperature Threshold breached for ${city}!
                Your temperature threshold is ${user.thresholds.temperature}°C, but now the temperature has exceeded the threshold.
                Take care of yourself and your loved ones.
                `;
                console.log(`Temperature Threshold breached for ${city} for user ${user.name}!`);

                sendAlertEmail(user, msg);
                
                // Log breach event
                await ThresholdBreach.create({
                    user: user._id,
                    city: city,
                    breachedThreshold: "temperature",
                });
            }

            // Check for condition threshold breach
            if (user.thresholds.conditions.includes(mainCondition)) {
                const msg = `
                Dear user,
                Condition Threshold breached for ${city}!
                The weather condition of ${mainCondition} has met your defined threshold.
                `;
                console.log(`Condition Threshold breached for ${city} for user ${user.name}!`);

                sendAlertEmail(user, msg);

                // Log breach event
                await ThresholdBreach.create({
                    user: user._id,
                    city: city,
                    breachedThreshold: "condition",
                });
            }
        }
    } catch (err) {
        console.error('Error checking thresholds:', err);
    }
};

const checkConsecutiveThreshold = async (thresholdTemp, consecutiveThreshold, city) => {
    try {
        const weatherData = await Weather.find({ city }).sort({ timeOfData: -1 }).limit(consecutiveThreshold);

        let count = 0;
        for (const data of weatherData) {
            if (data.temperature > thresholdTemp) {
                count++;
            }
        }

        return count >= consecutiveThreshold;
    } catch (err) {
        console.error('Error checking consecutive temperature threshold:', err);
        return false;
    }
};

module.exports = checkThresholdBreach;
