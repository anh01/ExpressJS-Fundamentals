/**
 * Created by Toni on 5/27/2017.
 */

const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 9999

http.createServer((req, res) => {
  let path = url.parse(req.url).pathname

  if (path === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      res.write(data)
      res.end()
    })
   } else if (path === '/favicon.ico') {

      fs.readFile('./favicon.jpg'), (err, data) => {

          if (err) {
              console.log(err)
          }

          res.writeHead(200, {

              "Content-Type": "image/jpg"
          })

      }

  }


  else {

      res.writeHead(404)
      res.write('Not found')
      res.end()

  }
}).listen(port)

console.log(`Server is listening on ${port}`)
