/**
 * Created by Toni on 6/7/2017.
 */
const Bike = require('../models/bike')

module.exports.index = (req, res) => {

    Bike.find().then((bikes)=>{

        res.render('home/index', {bikes: bikes})

    })



}

module.exports.about = (req, res) => {


    res.render('home/about')
}
module.exports.contacts = (req, res) => {


    res.render('home/contact')
}