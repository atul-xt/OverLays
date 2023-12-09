const userModel = require('../models/user');
// const otpModel = require('../models/otp');
const evn = require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');


const SECRET_KEY = process.env.SECRET_KEY;
const { hashPassword, verifyPassword } = require('../services/hashingPassword');


if (!SECRET_KEY) {
    console.error('secret key not found');
    process.exit(1);
}

//defining a register function 
async function userRegisteration(req, res) {
    try {
        let { firstName, lastName, email, password } = req.body;

        const validationErrors = [];
        if (validator.isEmpty(firstName)) validationErrors.push({ msg: 'firstName cannot be blank.' });
        if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
        if (validator.isEmpty(password)) validationErrors.push({ msg: 'Password cannot be blank.' });
        if (validationErrors.length) return res.sendStatus(401).json({ error: validationErrors });
        
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(400).json({ error: "User with this email already exists" });

        // password = encrypt(password, secretKey, iv);
        hash = hashPassword(password, salt);

        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash
        });

        res.status(200).json({
            msg: "Registration Successfull !",
            data: newUser
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={
    userRegisteration,
}