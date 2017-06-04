/**
 * Created by Toni on 6/2/2017.
 */
const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({

    url: {type: mongoose.Schema.Types.String, required: true},
    creation_date: {type: mongoose.Schema.Types.Date, default: Date.now},
    description: {type: mongoose.Schema.Types.String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]

})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image