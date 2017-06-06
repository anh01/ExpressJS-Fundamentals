/**
 * Created by Toni on 5/21/2017.
 */

const http = require('http')
const port = 8000
const handlers = require('./handlers')

let environment = process.env.NODE_ENV || 'development'


const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')
let app = express()
database(config[environment])

require('./config/express')(app, config[environment])
require('./config/routes')(app)


app.listen(port)

// http.createServer((req, res) => {
//   for (let handler of handlers) {
//     if (!handler(req, res)) {
//       break
//     }
//   }
// }).listen(port)
