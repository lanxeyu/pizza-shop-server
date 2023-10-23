const webpush = require('web-push');

const sendPushNotification = (subscription, payload) => {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
};

module.exports = {
  sendPushNotification,
};