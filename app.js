const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const orderRoutes = require('./routers/order')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        title: "Pluto's Pizza Sales",
    })
})

app.use('/orders', orderRoutes)


module.exports = app