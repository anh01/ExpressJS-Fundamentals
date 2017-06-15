/**
 * Created by Toni on 6/14/2017.
 */
const mongoose = require('mongoose')


const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
let ObjectId = mongoose.Schema.Types.ObjectId

let rentSchema = new mongoose.Schema({


    car: { type: ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Car'},
    user: { type: ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User' },
    rentedOn: { type: Date, default: Date.now() },
    days: { type: Number, required: true },
    totalPrice: { type: String, required: REQUIRED_VALIDATION_MESSAGE }


})


let Rent = mongoose.model('Rent', rentSchema)