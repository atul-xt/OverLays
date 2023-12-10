const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        }
    },
    productDetails: {
        type: Array,
        required: true
    },
    shippingDetails: {
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
        },
        paymentType: {
            type: String,
            required: true,
        }
    },
});
const shipping = mongoose.model('shipping', shippingSchema)
module.exports = shipping;