/**
 * Created by apetrov on 5/29/2017.
 */
const fs = require('fs')

module.exports = (req, res) => {
  let getContentType = (url) => {
    let contentType = 'text/html'

    if (url.endsWith('.css')) {
      return contentType = 'text/css'
    }
    if (url.endsWith('.js')) {
      return contentType = 'application/javascript'
    }
  }

  if (req.path.startsWith('/content') && ((req.path.endsWith('.css') || (req.path.endsWith('.js')) || (req.path.endsWith('.jpg'))))) {
    fs.readFile('.' + `${req.path}`, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.write('This resource is not found')
        res.end()
      }

      res.writeHead(200, {
        'Content-Type': getContentType(req.path)
      })

      res.write(data)
      res.end()
    })
  } else {
    res.writeHead(404)
    res.write('This resource is not found')
    res.end()

    return true
  }
}
