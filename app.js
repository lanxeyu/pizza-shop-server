const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        title: "Pluto's Pizza Sales",
    })
})

module.exports = app