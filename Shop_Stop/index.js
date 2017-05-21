/**
 * Created by Toni on 5/21/2017.
 */

const http = require('http')
const port = 8000
const handlers = require('./handlers')

http.createServer((req, res) => {

   for (let handler of handlers) {

       if (!handler(req,res)) {

           break
       }

   }
}).listen(port)