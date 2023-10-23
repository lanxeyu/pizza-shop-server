const fs = require('fs')
require('dotenv').config()

const sql = fs.readFileSync('./database/setup.sql').toString()

const db = require('./connect')

db.query(sql)
    .then(data => console.log("Set-up complete."))
    .catch(error => console.log(error));