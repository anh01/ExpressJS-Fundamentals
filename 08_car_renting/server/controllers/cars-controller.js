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