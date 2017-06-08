/**
 * Created by Toni on 6/7/2017.
 */

const path = require('path')

module.exports = {

    development: {

        connectionString: "mongodb://localhost:27017/bike-catalog",
        rootPath: path.normalize(path.join(__dirname, '../'))

    },

    production: {


    }

}