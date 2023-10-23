const Order = require("../models/Order")

async function index (req, res) {
    console.log('controller')
    try {
        const orders = await Order.getAll()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body
        const newOrder = await Order.create(data)
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400).json({ error: err.message} )
    }
}

module.exports = {
    index, create
}