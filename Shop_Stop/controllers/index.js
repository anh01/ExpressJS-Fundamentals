/**
 * Created by Toni on 5/21/2017.
 */
const homeHandler = require('./home')
const filesHandler = require('./static-file')
const productHandler = require('./product')
const categoryHandler = require('./category')
const userController = require('./user')

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
    user: userController

}
