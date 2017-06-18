/**
 * Created by Toni on 6/18/2017.
 */
const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let tweetSchema = new mongoose.Schema({
    content: { type: String, required: REQUIRED_VALIDATION_MESSAGE, maxlength: 140},
    tags: [],
    createdOn: {type: Date, default: Date.now()},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

})

let Tweet = mongoose.model('Tweet', tweetSchema)