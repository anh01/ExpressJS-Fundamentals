/**
 * Created by Toni on 5/29/2017.
 */
const db = require('./form_handler').dbpics

module.exports = (req, res) => {
  if (req.path.startsWith('/images/details/')) {
    let id = req.path.slice(-1)

    res.writeHead(200, {

      'Content-Type': 'text/html'
    })

    console.log(id)

    let html = `<html><img src="${db[id].url}" height="250" width="250"></html>`

    res.write(html)
    res.end()
  } else {
    return true
  }
}
