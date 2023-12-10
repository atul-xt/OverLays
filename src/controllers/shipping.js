const shippingModel = require('../models/shipping');

async function makeOrder(req, res) {
    try {
        const { user, productDetails, shippingDetails } = req.body;
        console.log(user, productDetails, shippingDetails);

        if (!user || !productDetails || !shippingDetails) return res.status(422).json({ error: "Missing Field" });
      

        const newOrder =  shippingModel.create({
            ...user,
            productDetails,
            ...shippingDetails
        })

        if (!newOrder) return res.status(400).json({ error: "Error creating user" });


        return res.status(200).json({ data: newOrder });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
async function testing(req, res) {

}

module.exports = { makeOrder };