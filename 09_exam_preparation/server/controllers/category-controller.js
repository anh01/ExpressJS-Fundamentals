/**
 * Created by Toni on 6/17/2017.
 */

const Category = require('mongoose').model('Category')

module.exports = {

  addGet: (req, res) => {
    res.render('category/add')
  },

  addPost: (req, res) => {
    Category.create(
            {name: req.body.name}
        ).then(() => {
          res.render('home/index')
        })
  }

}
