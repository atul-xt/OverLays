const express = require('express');
const { connectMongo } = require('./connection');
const evn = require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Routes Access
const userRouter = require("./routes/user")
const shippingRouter = require("./routes/shipping")

// MongoDb Connection 

connectMongo(process.env.mongo_url + "OverlaysNew").then(() => console.log('Mongo Connected')).catch((err) => console.log('Mongo Error Occured', err));

// middlewares 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', userRouter);
app.use('/shipping', shippingRouter);


app.use(express.static('../Public'));


app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
})