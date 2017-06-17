/**
 * Created by apetrov on 6/15/2017.
 */
const Thread = require('mongoose').model('Thread')
const Answer = require('mongoose').model('Answer')

module.exports = {

  addGet: (req, res) => {
    res.render('thread/add')
  },

  addPost: (req, res) => {
    let newThreadObj = req.body

    Thread.create({

      title: newThreadObj.title,
      content: newThreadObj.content,
      user: req.user,
      answers: []

    }).then((newThread) => {
      res.locals.globalMessage = 'Thread created!'
      res.render('home/index')
    })
  },

  list: () => {
    return Thread.find({})
  },

  getIndexData: () => {
    return Thread.find({}).sort('-lastAnswerDate')
  },

  getDetails: (req, res) => {
    let id = req.query.id

    Thread.findById(id)
            .populate('answers')
            .then((foundThread) => {
              res.render('thread/details', {

                thread: foundThread
              })
            })
  },

  addAnswerPost: (req, res) => {
    let threadId = req.params.id
    let answerData = req.body.content

    Answer.create({

      content: answerData,
      user: req.user._id

    }).then((createdAnswer) => {
      Thread.findById(threadId).then((foundThread) => {
        foundThread.answers.push(createdAnswer._id)
        foundThread.lastAnswerDate = createdAnswer.date
        foundThread.save().then(
                    res.redirect(`/thread/?id=${foundThread._id}`)
                )
      })
    })
  },

  editGet: (req, res) => {
    let threadID = req.query.id

    Thread.findById(threadID).then((foundThread) => {
      res.render('thread/edit', {thread: foundThread})
    })
  },
  editPost: (req, res) => {
    let threadID = req.params.id
    let editedThreadObject = req.body

    Thread.findById(threadID).then((foundThread) => {
      foundThread.title = editedThreadObject.title || foundThread.title,
          foundThread.content = editedThreadObject.content || foundThread.content
        foundThread.save().then((savedThread) =>{

          res.render('thread/details', {
              thread: savedThread
          })
        })
    })
  }

}
