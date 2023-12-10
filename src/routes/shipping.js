const express = require('express');
const { authecticateUser } = require('../middlewares/auth')
const shippingController = require("../controllers/shipping")

const router = express.Router();

router.post('/makeOrder', authecticateUser, shippingController.makeOrder);
// router.post('/login', userController.userLogin);




module.exports = router;