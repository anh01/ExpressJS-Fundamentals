const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', auth.isAuthenticated, controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.post('/users/search', auth.isAuthenticated, controllers.users.search)
  app.post('/thread/new/:userTwo', auth.isAuthenticated, controllers.thread.openNewThread)

    app.get('/thread/:userTwo', auth.isAuthenticated, controllers.thread.openThread)

    app.get('/thread/old/:threadId', auth.isAuthenticated, controllers.thread.openOldThread)

    app.post('/thread/addMessage/:threadId', auth.isAuthenticated, controllers.thread.addMessage)


    app.post('/message/like/:messageId/:threadId', auth.isAuthenticated, controllers.message.like)
    app.post('/message/dislike/:messageId/:threadId', auth.isAuthenticated, controllers.message.dislike)

    app.post('/thread/block/:userForBlock/:threadId', auth.isAuthenticated, controllers.thread.blockUser)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
