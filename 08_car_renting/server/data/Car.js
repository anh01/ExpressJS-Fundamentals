const mongoose = require('mongoose')


const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let carSchema = new mongoose.Schema({
    model: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    image: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    price: { type: String, required: REQUIRED_VALIDATION_MESSAGE }

})


let Car = mongoose.model('Car', carSchema)
