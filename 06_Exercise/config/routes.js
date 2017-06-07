/**
 * Created by Toni on 6/7/2017.
 */
const handlers = require('../handlers/index')


module.exports = (app) => {

    app.get('/', handlers.home.index )



}


