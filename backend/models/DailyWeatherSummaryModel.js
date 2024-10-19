const mongoose = require('mongoose');

const dailyWeatherSummarySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    avgTemperature: {
        type: Number,
        required: true
    },
    maxTemperature: {
        type: Number,
        required: true
    },
    minTemperature: {
        type: Number,
        required: true
    },
    dominantCondition: {
        type: String,
        required: true
    }
}, { timestamps: true });

const DailyWeatherSummary = mongoose.model('DailyWeatherSummary', dailyWeatherSummarySchema);

module.exports = DailyWeatherSummary;
