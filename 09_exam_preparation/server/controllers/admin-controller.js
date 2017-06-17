/**
 * Created by Toni on 6/17/2017.
 */
const User = require('mongoose').model('User')

module.exports = {

  viewAllGet: (req, res) => {
    User.find({roles: 'Admin'}).then((admins) => {
      res.render('admin/all', {

        admins: admins
      })
    })
  },

  addNewAdminPost: (req, res) => {
    let username = req.body.username

    User.findOne({username: username}).then((foundUser) => {
      foundUser.roles = ['Admin']
      foundUser.save().then((updatedUser) => {
        res.redirect('/admin/all')
      })
    })
  },

  blockUser: (req, res) => {
    let username = req.body.username
    User.findOne({username: username}).then((foundUser) => {
      foundUser.isblocked = true
      foundUser.save().then((updatedUser) => {
        res.redirect('/admin/all')
      })
    })
  }

}
