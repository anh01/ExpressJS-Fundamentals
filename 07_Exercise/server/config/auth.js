const Article = require('../data/Article')

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/users/login')
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next()
      } else {
        res.redirect('/users/login')
      }
    }
  },
    isAuthor:
         (req, res, next) => {

              let articleId = req.params.id

             if (req.isAuthenticated()) {


                 Article.findById(articleId).then((articleFound) =>{

                     let userId = articleFound.author.toString()

                     let currentUserId = req.user._id.toString()


                     if (userId === currentUserId) {
                         next()
                     } else {
                         res.locals.globalError = 'Your are not owner!'
                         res.render('home/index')
                     }

                 })


             } else {
                 res.locals.globalError = 'You are not logged in!'
                 res.render('home/index')
             }






        }

}
