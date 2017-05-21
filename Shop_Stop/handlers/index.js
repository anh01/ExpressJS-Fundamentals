/**
 * Created by Toni on 5/21/2017.
 */
const homeHandler = require('./home')
const filesHandler = require('./static-file')
const productHandler = require('./product')
module.exports = [homeHandler, filesHandler, productHandler]
