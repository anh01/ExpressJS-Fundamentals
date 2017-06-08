/**
 * Created by Toni on 6/8/2017.
 */
const Bike = require('../models/bike')

module.exports.addGet = (req, res) => {

    res.render('bike/add')

}

module.exports.addPost = (req, res) => {

    let bikeObject = req.body
    bikeObject.image = `/public/images/${req.file.filename}`

    Bike.create(bikeObject).then(()=>{

        res.redirect('/')

    })



}