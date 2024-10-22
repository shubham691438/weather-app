const mongoose = require('mongoose');

const ThresholdBreachSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    breachedThreshold: {
        type: String,  // "temperature" or "condition"
        required: true
    },

    time: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('ThresholdBreach', ThresholdBreachSchema);;
