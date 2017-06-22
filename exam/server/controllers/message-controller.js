/**
 * Created by Toni on 6/18/2017.
 */
const Message = require('mongoose').model('Message')
const Thread = require('mongoose').model('Thread')

module.exports = {


    like: (req, res) => {



    Message.findById(req.params.messageId).then((foundMessage)=>{


        foundMessage.isLiked = true
        foundMessage.save().then(()=>{

        Thread.findById(req.params.threadId)
            .populate('messages')
            .then((foundThread)=>{

            res.render('thread/thread', {

                thread: foundThread
            })

        })




        })

    })


    },


    dislike: (req, res) => {


        Message.findById(req.params.messageId).then((foundMessage)=>{


            foundMessage.isLiked = false
            foundMessage.save().then(()=>{

                Thread.findById(req.params.threadId)
                    .populate('messages')
                    .then((foundThread)=>{

                        res.render('thread/thread', {

                            thread: foundThread
                        })

                    })




            })

        })


    }



}