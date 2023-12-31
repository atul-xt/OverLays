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
async function userRegistration(req, res) {
    try {
        let { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);

        if (!firstName || !email || !password) return res.status(422).json({ msg: "Missing Field" });

        password = hashPassword(password, crypto.randomBytes(16).toString('hex'));

        const exists = await userModel.findOne({ email: email });

        if (exists) return res.status(400).json({ error: "User with this email already exists" });

        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password,
        });

        if (!newUser) return res.status(400).json({ error: "Error creating user" });

        return res.status(200).json({ data: newUser });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email || !password) return res.status(422).send("Missing Field");

        const user = await userModel.findOne({ email });
        // console.log(user);
        if (!user) return res.status(401).json({ error: "User Not Found" });

        const result = verifyPassword(password, user.password.hashed, user.password.salt);

        if (result) {
            // Payload
            const userData = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };
            // Generate the token
            const token = jwt.sign(userData, SECRET_KEY);
            return res.status(200).json(token);
        }
        res.status(401).json({
            error: 'Password mismatch'
        })


    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

}
module.exports = {
    userRegistration,
    userLogin,
}