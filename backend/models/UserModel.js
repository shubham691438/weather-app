const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // For password hashing

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
            default: 35 // Default threshold for temperature in Celsius
        },
        conditions: {
            type: [String],  // Array of weather conditions (e.g., Rain, Snow, Clear)
            default: ['Rain', 'Snow']
        },
        consecutiveThreshold:{
            type:Number,
            default:1
        }
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare input password with hashed password in DB
userSchema.methods.comparePassword = async function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);
