/**
 * Created by Toni on 6/18/2017.
 */
const User = require('mongoose').model('User')
const Thread = require('mongoose').model('Thread')
const Message = require('mongoose').model('Message')

module.exports = {

  openThread: (req, res) => {

        userOne = req.user
        userTwo = req.params.userTwo

      User.findOne({username: userTwo}).then((foundUser) =>{

          Thread.findOne({

              users: userOne && foundUser

          }).then((foundThread) => {


              if(foundThread) {

                  Thread.findById(foundThread._id)
                      .populate('messages')
                      .then((populatedThread)=>{

                      let otherUser = '';

                      if(populatedThread.users[0].toString() === req.user._id.toString()){

                           otherUser = populatedThread.users[1]
                      } else {
                           otherUser = populatedThread.users[0]
                      }

                      res.render('thread/thread', {

                          thread: populatedThread,
                          otherUser: otherUser
                      })

                  })


              } else {

                  res.locals.globalError = "Chat with such user doesn't exist"
                  res.render('home/index')

              }



          })


      })


  },


    addMessage: (req, res) =>{


      let threadId = req.params.threadId


        Message.create({
            content: req.body.message,
            owner: req.user.username,
            isLink: req.body.message.startsWith('http') || req.body.message.startsWith('https'),
            isImage: req.body.message.endsWith('jpg') || req.body.message.endsWith('jpeg') || req.body.message.endsWith('png')
        }).then((messageCreated) =>{

          Thread.findById(threadId).then((foundThread) =>{

              foundThread.messages.push(messageCreated)
              foundThread.save().then((savedThread)=>{

                    Thread
                        .findOne({_id: threadId})
                        .populate('messages').then((thread) =>{

                        let otherUser = '';

                        if(thread.users[0].toString() === req.user._id.toString()){

                            otherUser = thread.users[1]
                        } else {
                            otherUser = thread.users[0]
                        }


                        res.render('thread/thread', {

                            thread: thread,
                            otherUser: otherUser
                        })

                    })



              })

          })


        })


    },


    openOldThread: (req, res) => {


            let threadID = req.params.threadId


        Thread.findById(threadID)
            .populate('messages')
            .then((foundThread) => {

                let otherUser = '';

                if(foundThread.users[0].toString() === req.user._id.toString()){

                    otherUser = foundThread.users[1]
                } else {
                    otherUser = foundThread.users[0]
                }


                res.render('thread/thread', {

                    thread: foundThread,
                    otherUser: otherUser,

                })

            })

    },


    openNewThread: (req, res) =>{

        userOne = req.user
        userTwo = req.params.userTwo

        User.findOne({username: userTwo}).then((foundUser)=>{

            Thread.create({

                users: [userOne, foundUser]


            }).then((createdThread) =>{

                createdThread
                    .populate('messages')

                res.render('thread/thread', {

                    thread: createdThread

                })

            })


        })



    },

blockUser: (req, res) => {


      Thread.findById(req.params.threadId).then((foundThread)=>{

          User.findById(req.params.userForBlock).then((foundUser)=>{

              foundThread.blockedUsers.push(foundUser)
              foundThread.save().then((savedThread)=>{

                  res.locals.globalError = `User ${foundUser.username} blocked!`
                  res.render('home/index')

              })

          })




      })

}

}
