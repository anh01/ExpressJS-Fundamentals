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

    getIndexData: () => {

   return Thread.find({})

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

        Thread.findById(threadId).then((foundThread) =>{

            foundThread.answers.push(createdAnswer._id)
            foundThread.save().then(

                res.redirect(`/thread/?id=${foundThread._id}`)
            )
        })

        })


    }







}