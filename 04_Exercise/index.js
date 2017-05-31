/**
 * Created by Toni on 5/27/2017.
 */
const http = require('http')
const url = require('url')
const port = 5432

let handlers = require('./handlers/index')

http.createServer((req, res) => {
  req.path = url.parse(req.url).pathname

  for (let handler of handlers) {
    let nexthandler = handler(req, res)

    if (!nexthandler) {
      break
    }
  }
}).listen(port)

console.log(`Server is listening on ${port}`)
