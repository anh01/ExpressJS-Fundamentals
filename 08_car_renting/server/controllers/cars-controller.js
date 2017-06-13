/**
 * Created by Toni on 6/13/2017.
 */
const Car = require('mongoose').model('Car')

module.exports.addGet = (req, res) => {

    res.render('cars/add')

}


module.exports.addPost = (req, res) => {

    let newCarObj = req.body

    Car.create({

        model: newCarObj.model,
        image: newCarObj.image,
        price: newCarObj.price

    }).then((car) =>{

        res.locals.message = 'Car added!'
    res.render('home/index')

    }

    ).catch((err)=>{

        res.locals.globalError = err
        res.render('home/index')

    })

}