const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const { sendPushNotification } = require('./services/notification.js');

const orderRoutes = require('./routes/order');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BIgp7JGC-EZKn2Fcvt7iBFQLlDj-iVzWU3I8ZlzrwhSuzXRHa23KsVmyk_cWKLGY9yBBx0esawbCzKkRrSer7cU';
const privateVapidKey = 'nFRrhg3G_giv5lh19z3Gq1nNoqF2GuirHAv4lYomuDM';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', async (req, res) => {
    try {
      const subscription = req.body;
      const payload = { title: 'Push Test' };
  
      await sendPushNotification(subscription, payload);
  
      res.status(201).json({ message: 'Push notification sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending push notification' });
    }
});
  

app.use(express.json())
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        title: "Pluto's Pizza Sales",
    })
})

app.use('/orders', orderRoutes)

module.exports = app