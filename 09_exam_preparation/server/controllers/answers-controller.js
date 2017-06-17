/**
 * Created by apetrov on 6/16/2017.
 */

const Thread = require('mongoose').model('Thread')
const Answer = require('mongoose').model('Answer')

module.exports = {

  editGet: (req, res) => {
    let answerId = req.query.id

    Answer.findById(answerId).then((foundAnswer) => {
      res.render('answer/edit', {
        answer: foundAnswer
      })
    })
  },

  editPost: (req, res) => {
    let answerId = req.params.id
    let newAnswerObj = req.body

    Answer.findById(answerId).then((foundAnswer) => {
      foundAnswer.content = newAnswerObj.content || foundAnswer.content
      foundAnswer.save().then((savedAnswer) => {
        res.render('home/index')
      })
    })
  },

  deletePost:

        (req, res) => {
          let answerId = req.params.id

          Thread.update({_id: req.params.threadId}, { $pullAll: {answers: [answerId] } }).then(() => {
            Answer.find({ _id: answerId }).remove().exec().then(() => {
              res.render('home/index')
            })
          })
        }

}
