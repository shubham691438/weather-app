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
    },
    avgHumidity: {
        type: Number,
        required: true
    },
    avgWindSpeed: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('DailyWeatherSummary', dailyWeatherSummarySchema);
