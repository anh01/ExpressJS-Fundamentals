/**
 * Created by Toni on 5/29/2017.
 */
const db = require('../database/database').pictures

module.exports = (req, res) => {
  if (req.path.startsWith('/content/download/')) {
    let url = req.path.slice(-9)

    res.writeHead(200, {

      'Content-Type': 'text/html'
    })

      db.findByUrl(url)



    let html = `<html><img src="${db.url}" height="250" width="250"></html>`

    res.write(html)
    res.end()
  } else {
    return true
  }
}
