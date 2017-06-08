/**
 * Created by Toni on 6/8/2017.
 */
const mongoose = require('mongoose')

let bikeSchema = mongoose.Schema({

    model: {type: mongoose.Schema.Types.String, required: true },
    description: {type: mongoose.Schema.Types.String, required: true },
    image: {type:mongoose.Schema.Types.String}


})

let Bike = mongoose.model('Bike', bikeSchema)

module.exports = Bike