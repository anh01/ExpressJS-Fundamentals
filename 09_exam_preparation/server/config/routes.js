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

  app.get('/thread/add', auth.isAuthAndNotBlocked, controllers.thread.addGet)
  app.post('/thread/add', auth.isAuthAndNotBlocked, controllers.thread.addPost)

  app.get('/answer/edit/', auth.isInRole('Admin'), controllers.answers.editGet)
  app.post('/answer/edit/:id', auth.isInRole('Admin'), controllers.answers.editPost)

  app.post('/answer/delete/:id/:threadId', auth.isInRole('Admin'), controllers.answers.deletePost)

  app.get('/thread/edit/', auth.isInRole('Admin'), controllers.thread.editGet)
  app.post('/thread/edit/:id', auth.isInRole('Admin'), controllers.thread.editPost)

  app.get('/thread/', auth.isAuthenticated, controllers.thread.getDetails)

  app.post('/thread/addanswer/:id', auth.isAuthAndNotBlocked, controllers.thread.addAnswerPost)

  app.get('/profile/:username', auth.isAuthenticated, controllers.users.loadInfo)

  app.get('/admin/all', auth.isInRole('Admin'), controllers.admin.viewAllGet)
  app.post('/admin/all', auth.isInRole('Admin'), controllers.admin.addNewAdminPost)

  app.post('/admin/block', auth.isInRole('Admin'), controllers.admin.blockUser)

  app.get('/list', auth.isAuthenticated, controllers.thread.list)
  app.get('/list/:category', auth.isAuthenticated, controllers.thread.listByCategory)

  app.post('/users/like/:id', auth.isAuthenticated, controllers.users.like)
  app.post('/users/dislike/:id', auth.isAuthenticated, controllers.users.dislike)

  app.get('/category/add', auth.isInRole('Admin'), controllers.category.addGet)
  app.post('/category/add', auth.isInRole('Admin'), controllers.category.addPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
