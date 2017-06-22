
const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let threadSchema = new mongoose.Schema({

  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    blockedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

})

let Thread = mongoose.model('Thread', threadSchema)
