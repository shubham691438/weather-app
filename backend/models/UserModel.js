const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const validator = require('validator'); 
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    thresholds: {
        temperature: {
            type: Number,
            default: 35 
        },
        conditions: {
            type: [String],  
            default: ['Rain', 'Snow']
        },
        consecutiveThreshold: {
            type: Number,
            default: 1
        }
    }
}, { timestamps: true });

/**
 * Static Register Method
 */
userSchema.statics.register = async function(name, email, password, city, temperature, conditions, consecutiveThreshold) {

    console.log('Registering user:', name, email, city, temperature, conditions, consecutiveThreshold);
    // Validation
    if (!name) {
        throw new Error("Name is required");
    }

    if (!email) {
        throw new Error("Email is required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
    }

    if (password.length < 8) {
        throw new Error("Password should be at least 8 characters long");
    }

    // Check if user already exists
    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error("User already registered, login instead");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and return the new user
    const user = await this.create({
        name,
        email,
        password: hashedPassword,
        city,
        thresholds: {
            temperature: temperature || 35, 
            conditions: conditions || ['Rain', 'Snow'],
            consecutiveThreshold: consecutiveThreshold || 1
        }
    });

    return user;
};

/**
 * Static Login Method
 */
userSchema.statics.login = async function(email, password) {
    // Validate email and password presence
    if (!email) {
        throw new Error("Email is required");
    }

    if (!password) {
        throw new Error("Password is required");
    }

    // Find user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("Email not registered");
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
