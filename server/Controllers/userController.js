const userModel  = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, {
        expiresIn: "3d"
    });
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = userModel.findOne({ email });
        console.log(user.email);
        if (user.email) {
            return res.status(400).json({
                success: false,
                message: "User with the given email already exists..." 
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required..." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address..." });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password is not strong enough..." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = createToken(user._id);

        res.status(201).json(
            {
                success: true,
                message: "User registered successfully",
                _id: user._id,
                name,
                email, 
                token
            });
    } catch (error) {
        console.error(error);
        res.status(500).json(
            {
                success: false,
                message: error.message
            });
    }
};