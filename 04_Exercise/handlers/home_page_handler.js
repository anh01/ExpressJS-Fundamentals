/**
 * Created by apetrov on 5/29/2017.
 */
const fs = require('fs')
const db = require('../database/database').pictures.getAll()

module.exports = (req, res) => {
  if (req.path === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      //console.log(db)
      let content = ''

      for (let picture of db) {
        content +=
                        `<div><a href= "/content/download/${picture.url}" download> <h2>${picture.name}</h2></div>`
      }

      let html = data.toString().replace('{content}', content)

      res.write(html)
      res.end()
    })
  } else {
    return true
  }
}
