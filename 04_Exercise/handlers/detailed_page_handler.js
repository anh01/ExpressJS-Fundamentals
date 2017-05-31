/**
 * Created by Toni on 5/29/2017.
 */
const db = require('../database/database').pictures
const fs = require('fs')


module.exports = (req, res) => {
  if (req.path.startsWith('/content/download/')) {
    let url = req.path.slice(-9)

      console.log(url)

      let picture = db.findByUrl(url)


      let filePath = picture[0].path;
      let stat = fs.statSync(filePath);

      res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': stat.size
      });

      let readStream = fs.createReadStream(filePath);

      readStream.pipe(res);
  } else {
    return true
  }
}
