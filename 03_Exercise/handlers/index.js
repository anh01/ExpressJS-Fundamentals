/**
 * Created by apetrov on 5/29/2017.
 */
let homeHandler = require('./home_page_handler')
let faviconHandler = require('./favicon_handler')
let staticHandler = require('./static_file_handler')
let formHandler = require('./form_handler')

module.exports = [formHandler, homeHandler, faviconHandler, staticHandler ]



