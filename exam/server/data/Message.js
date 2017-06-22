const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let messageSchema = new mongoose.Schema({

  content: { type: String, required: REQUIRED_VALIDATION_MESSAGE, maxLength: 1000},
  owner: {type: String},
  time: {type: mongoose.Schema.Types.Date, default: Date.now()},
  isLiked: {type: Boolean},
  isLink: {type: Boolean},
    isImage: {type: Boolean}

})

let Message = mongoose.model('Message', messageSchema)
