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

const publicVapidKey = 'BH9_qhRn_59xQ44j_7sFcM9MZfE-k-_Lk2SzUvs2_XoNdotQB4thDAm543PSmBADMHNSC9MNVIrDG0YGAZVj62Q';
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.use(express.json())
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        title: "Pizza Shop Sales",
    })
})

app.use('/orders', orderRoutes)

module.exports = app