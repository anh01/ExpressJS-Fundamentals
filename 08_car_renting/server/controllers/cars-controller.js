/**
 * Created by Toni on 6/13/2017.
 */
const Car = require('mongoose').model('Car')
const Rent = require('mongoose').model('Rent')

module.exports.addGet = (req, res) => {

    res.render('cars/add')

}


module.exports.addPost = (req, res) => {

    let newCarObj = req.body

    Car.create({

        model: newCarObj.model,
        image: newCarObj.image,
        price: newCarObj.price

    }).then((car) => {

            res.locals.message = 'Car added!'
            res.render('home/index')

        }
    ).catch((err) => {

        res.locals.globalError = err
        res.render('home/index')

    })

}

module.exports.getAll = (req, res) => {

    let pageSize = 2
    let page = parseInt(req.query.page) || 1

    let search = req.query.search

    let query = Car.find({isRented: false})

    if (search) {
        query = query.where('model').regex(new RegExp(search, 'i'))
    }

    query
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then((carsFound) => {

            res.render('cars/all', {

                cars: carsFound,
                hasPrevPage: page > 1,
                hasNextPage: carsFound.length > 0,
                prevPage: page - 1,
                nextPage: page + 1
            })

        })


}

module.exports.rent = (req, res) => {

    let days = req.body.days
    let carId = req.params.id

    Car.findById(carId)
        .then((foundCar) => {

            Rent.create({

                car: carId,
                user: req.user._id,
                days: days,
                totalPrice: days * foundCar.price

            })

            foundCar.isRented = true
            foundCar.save().then((car) =>{

                res.redirect('/users/me')
            })



        })




}

module.exports.meGet = (req, res) =>{

    Rent.find({user: req.user._id})
        .populate('car')
        .then((rentsFound) => {

        console.log(rentsFound)
            res.render('users/me', {

                rents: rentsFound

            })


        })

}

module.exports.editGet = (req, res) => {

        let carID = req.query.carid


    Car.findById(carID).then((foundCar) => {

            res.render('cars/edit', {

                car: foundCar
            })



    })


}


module.exports.editPost = (req, res) => {

    let carId = req.params.id
    let carObj = req.body

    console.log(carObj)

    Car.findById(carId).then((foundCar) => {

       foundCar.model = carObj.model || foundCar.model
        foundCar.image = carObj.image || foundCar.image
        foundCar.price = carObj.price || foundCar.price
        foundCar.isRented = carObj.isRented || foundCar.isRented

        foundCar.save().then(()=>{

            res.locals.globalError = 'Edited.'
            res.render('home/index')

            })



    })


}


