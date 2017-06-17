/**
 * Created by Toni on 6/17/2017.
 */
const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let categorySchema = new mongoose.Schema({

  name: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true}

})

let Category = mongoose.model('Category', categorySchema)
