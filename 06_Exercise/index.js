/**
 * Created by Toni on 6/7/2017.
 */
const express = require('express')
const config = require('./config/config')

let environment = process.env.NODE_ENV || 'development'
const port = 5555
let app = express()

require('./config/database.config')(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)

app.listen(port)
