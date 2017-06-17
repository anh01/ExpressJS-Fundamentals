const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let threadSchema = new mongoose.Schema({
  title: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  content: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  user: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  answers: [{type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Answer' }],
  lastAnswerDate: {type: mongoose.Schema.Types.Date},
  views: {type: Number, default: 0},
  category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  likes: {type: Number, default: 0}

})

let Thread = mongoose.model('Thread', threadSchema)
