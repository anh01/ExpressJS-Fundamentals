/**
 * Created by Toni on 6/11/2017.
 */
const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let articleSchema = new mongoose.Schema({

    title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    description: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE}

})



let Article = mongoose.model('Article', articleSchema)

module.exports = Article