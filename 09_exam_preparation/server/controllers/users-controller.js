const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
const Thread = require('mongoose').model('Thread')
const Answer = require('mongoose').model('Answer')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
  },

  loadInfo: (req, res) => {
    let userId = req.user

    Thread.find({user: userId}).then((foundThreads) => {
      Answer.find({user: userId}).then((foundAnswers) => {
        res.render('users/myprofile', {

          threads: foundThreads,
          answers: foundAnswers

        })
      })
    })
  },

  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },

  like: (req, res) => {
    let threadId = req.params.id

        if(req.user.likedThreads.indexOf(threadId) > 0){

          res.render('home/index')

        } else {
            req.user.likedThreads.push(threadId)
            req.user.save().then(() => {
            Thread.findById(threadId).then((foundThread) => {
                foundThread.likes++
                foundThread.save().then(() => {
                    res.render('thread/details', {

                        userHasLiked: true,
                        thread: foundThread

                    })
                })
            })
        })}


  },

  dislike: (req, res) => {

  }
}
