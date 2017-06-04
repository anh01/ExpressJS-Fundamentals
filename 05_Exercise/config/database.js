/**
 * Created by Toni on 6/2/2017.
 */
const mongoose = require('mongoose')


let dbName = 'mongoDb_mongoose_exercise'
let connection = `mongodb://localhost:27017/${dbName}`
mongoose.Promise = global.Promise

module.exports = () => {

    return new Promise((resolve, reject) => {


    mongoose.connect(connection)
    let db = mongoose.connection

    db.on('error', (err) => {

        console.log(err)
        reject()

    });

    db.once('open', err => {
        if (err) {
            console.log(err)
            return
        }

        console.log('Connected!')
        resolve()
    })





   })






}