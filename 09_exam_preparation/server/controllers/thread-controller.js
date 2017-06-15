/**
 * Created by apetrov on 6/15/2017.
 */
const Thread = require('mongoose').model('Thread')


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




    }




}