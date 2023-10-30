const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv')

const orderRoutes = require('./routes/order');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

dotenv.config()

const publicVapidKey = 'BIgp7JGC-EZKn2Fcvt7iBFQLlDj-iVzWU3I8ZlzrwhSuzXRHa23KsVmyk_cWKLGY9yBBx0esawbCzKkRrSer7cU';
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.use(express.json())
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        title: "Pluto's Pizza Sales",
    })
})

app.use('/orders', orderRoutes)

module.exports = app