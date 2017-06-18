/**
 * Created by Toni on 6/18/2017.
 */
const Tweet = require('mongoose').model('Tweet')
const User = require('mongoose').model('User')
module.exports = {


addGet: (req, res) => {


    res.render('tweet/add')

},



    addPost: (req, res) => {


        let newTweetObj = req.body.content

        let reTags = /\#(\w+)/g;
        let tweetContent = newTweetObj;
        let m;

        let reHandles = /\@(\w+)/g;

        let tags = []
        let handles = []
        do {
            m = reTags.exec(tweetContent);
            if (m) {
               tags.push(m[1])
            }
        } while (m);

        do {
            m = reHandles.exec(tweetContent);
            if (m) {
                handles.push(m[1])
            }
        } while (m);

        let usersObj = []
        let promise = []

           for (let username of handles) {

            promise.push(
                User.findOne({username: username}).then((userFound) => {

                    usersObj.push(userFound)
                })
            )

           }


Promise.all(promise).then(() => {

    usersObj.push(req.user)
    Tweet.create({

        content: newTweetObj,
        tags: tags,
        users: usersObj
    }).then((createdTweet) => {

        res.render('home/index')

    }).catch((err)=>{

        res.locals.globalError = 'Too fuckin long dude'
        res.render('home/index')
    })

})


    },

    listByTag: (req, res) => {


    let tagNeeded = req.params.tagname

        Tweet.find({tags: tagNeeded})
            .limit(100)
            .sort('-createdOn')
            .then((foundTweets) => {

          res.render('tweet/listbytag', {

              tweets: foundTweets
          })

        })

    },

    byUser: (req, res) => {

    User.findOne({username: req.params.username}).then((foundUser) => {

        Tweet.find({users: foundUser})
            .then((foundTwets) => {

                console.log(foundTwets)

            })

    })



    }

}