const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        }
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true
    },
    shippingAddress: {
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    paymentType: {
        type: String,
        required: true,
    }
});
const user = mongoose.model('user', userSchema)
module.exports = user;