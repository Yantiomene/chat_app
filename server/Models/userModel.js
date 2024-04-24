const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;