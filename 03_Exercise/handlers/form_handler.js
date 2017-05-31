/**
 * Created by apetrov on 5/29/2017.
 */
let qs = require('querystring')
let pictures = []
exports.dbpics = pictures
exports.method = (req, res) => {
  let picture = {}

  if (req.method == 'POST') {
    let data = ''

    req.on('data', function (chunk) {
      data += chunk
    })

    req.on('end', function () {
      let parsedData = qs.parse(data)
      picture.name = parsedData.name
      picture.url = parsedData.url
      pictures.push(picture)
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    })
  } else {
    return true
  }
}
