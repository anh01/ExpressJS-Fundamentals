/**
 * Created by Toni on 6/7/2017.
 */
const handlers = require('../handlers/index')
const multer = require('multer')

let upload = multer({dest: 'public/images/'})

module.exports = (app) => {

    app.get('/', handlers.home.index )

    app.get('/about', handlers.home.about)

    app.get('/contact-us', handlers.home.contacts)

    app.get('/bike/add', handlers.bike.addGet )
    app.post('/bike/add', upload.single('image'),handlers.bike.addPost )



}


