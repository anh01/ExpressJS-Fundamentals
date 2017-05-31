/**
 * Created by Toni on 5/21/2017.
 */
const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')

module.exports.pictures = {}

module.exports.pictures.getAll = getPictures

module.exports.pictures.add = (picture) => {
  let pictures = getPictures()

  picture.id = pictures.length + 1
  pictures.push(picture)

  savePictures(pictures)
}

module.exports.pictures.findByUrl = (url) => {
  return getPictures().filter(p => p.url == url)
}

function getPictures () {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]')
    return []
  }

  let json = fs.readFileSync(dbPath).toString() || '[]'
  let pictures = JSON.parse(json)
  return pictures
}

function savePictures (pictures) {
  let json = JSON.stringify(pictures)
  fs.writeFileSync(dbPath, json)
}
