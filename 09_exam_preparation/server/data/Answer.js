/**
 * Created by apetrov on 6/15/2017.
 */
const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let answerSchema = new mongoose.Schema({

    content: { type: String, required: REQUIRED_VALIDATION_MESSAGE},
    user: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},


})



let Answer = mongoose.model('Answer', answerSchema)