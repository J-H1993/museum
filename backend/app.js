const express = require('express')
require('dotenv').config()

console.log(process.env.REACT_APP_API_KEY)


const app = express()

app.use(express.json())

app.get


module.exports = app