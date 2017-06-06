/**
 * Created by Toni on 5/21/2017.
 */

const port = 8000
const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')

let app = express()
let environment = process.env.NODE_ENV || 'development'

database(config[environment])
require('./config/express')(app, config[environment])
require('./config/routes')(app)
app.listen(port)


const handlers = require('./handlers')




