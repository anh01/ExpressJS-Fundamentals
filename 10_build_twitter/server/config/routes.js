const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

    app.get('/tweet', auth.isAuthenticated, controllers.tweet.addGet)
    app.post('/tweet', auth.isAuthenticated, controllers.tweet.addPost)

    app.get('/tag/:tagname', auth.isAuthenticated, controllers.tweet.listByTag)

    app.get('/profile/:username', auth.isAuthenticated, controllers.tweet.byUser)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
