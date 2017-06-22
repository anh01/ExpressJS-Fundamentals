const Thread = require('mongoose').model('Thread')

module.exports = {
  index: (req, res) => {

  Thread.find({users: req.user._id})
      .populate('users')
      .then((foundThreads) => {

      res.render('home/index', {

        threads: foundThreads
      })

  })



  },
  about: (req, res) => {
    res.render('home/about')
  }
}
