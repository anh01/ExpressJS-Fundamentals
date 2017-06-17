const home = require('./home-controller')
const users = require('./users-controller')
const thread = require('./thread-controller')
const answer = require('./answers-controller')
const admin = require('./admin-controller')
const category = require('./category-controller')

module.exports = {
  home: home,
  users: users,
  thread: thread,
  answers: answer,
  admin: admin,
  category: category
}
