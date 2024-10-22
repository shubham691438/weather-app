const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create JWT token
const maxAge = 2 * 24 * 60 * 60; // Token expiration time (2 days)
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT_KEY, { expiresIn: maxAge });
};

// Register new user
const register = async (req, res) => {
    const { name, email, password, city, temperatureThreshold, conditions, consecutiveThreshold } = req.body;

    try {
        const user = await User.register(name, email, password, city,  temperature=temperatureThreshold , conditions, consecutiveThreshold);


        // Create JWT token
        const token = createToken(user._id);

        // Return user data with token
        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            thresholds: user.thresholds,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // Create JWT token
        const token = createToken(user._id);

        // Return user data with token
        res.status(200).json({
            userId: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            thresholds: user.thresholds,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user data by ID
const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user data
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, city, temperature, conditions, consecutiveThreshold } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    name,
                    email,
                    city,
                    'thresholds.temperature': temperature,
                    'thresholds.conditions': conditions,
                    'thresholds.consecutiveThreshold': consecutiveThreshold
                }
            },
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    getUser,
    updateUser
};
