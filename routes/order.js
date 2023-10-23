const { Router } = require('express');

const orderRouter = Router();
const orderController = require('../controllers/order.js');

orderRouter.get('/', orderController.index);
orderRouter.post('/', orderController.create);
orderRouter.patch('/delivered/:id', orderController.updateOrderDelivered);

module.exports = orderRouter;
