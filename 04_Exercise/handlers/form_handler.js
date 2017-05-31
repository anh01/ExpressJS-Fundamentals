/**
 * Created by apetrov on 5/29/2017.
 */
let qs = require('querystring')
const formidable = require('formidable')
const fs = require('fs')
const db = require('../database/database').pictures
const shortid = require('shortid');

exports.method = (req, res) => {


  if (req.method == 'POST') {

      let picture = {}
      let form = new formidable.IncomingForm();
      let dbSize = db.getAll().length

      form.parse(req, function(err, fields, files) {

         let oldPath = files.picture.path
          let folderToSave = dbSize % 1000

          if (!fs.existsSync(`./content/pictures/${folderToSave}`)){
              fs.mkdirSync(`./content/pictures/${folderToSave}`)
          }


          picture.name = fields.name
          picture.url =  shortid.generate()

          let fileType = files.picture.name.slice(-3)

          let newPath = `./content/pictures/${folderToSave}/${shortid.generate()}.${fileType}`

          picture.path = newPath
          fs.rename(oldPath, newPath)

          db.add(picture)

      });

      res.writeHead(302, {
          Location: '/'
      })
      res.end()


  } else {
    return true
  }
}
