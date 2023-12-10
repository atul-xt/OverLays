const evn = require('dotenv').config();
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/user');

const secretKey = process.env.SECRET_KEY;

const authecticateUser = (req, res, next) => {
    console.log(req.body);
    let token = req.headers.authorization;

    // console.log(req.headers);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    token = token.split(" ")[1];
    // console.log(token);//replace method not working !!!
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        // console.log(decoded);
        req.body.user = decoded;
        console.log(req);
        next();
    })
}
module.exports = { authecticateUser };