const userModel = require('../models/user');
// const otpModel = require('../models/otp');
const evn = require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');


const SECRET_KEY = process.env.SECRET_KEY;
const { hashPassword, verifyPassword } = require('../services/hashingPassword');
const { log } = require('console');


if (!SECRET_KEY) {
    console.error('secret key not found');
    process.exit(1);
}

//defining a register function 
async function userRegistration(req, res) {
    try {
        let { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);

        if (!firstName || !email || !password) return res.status(422).json({ msg: "Missing Field" });

        password = hashPassword(password, crypto.randomBytes(16).toString('hex'));

        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password,
        });

        if (!newUser) return res.status(400).json({ error: "User with this email already exists" });

        res.status(200).json({ data: newUser });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    userRegistration,
}