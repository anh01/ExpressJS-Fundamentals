/**
 * Created by Toni on 6/11/2017.
 */
const Article = require('../data/Article')
const User = require('mongoose').model('User')

module.exports.addGet = (req, res) =>{

    res.render('articles/add')

}

module.exports.listGet = (req, res) =>{

    Article.find().then((articles) => {

        res.locals.articles = articles
        res.render('articles/list')

})
    }


module.exports.detailsGet = (req, res) =>{

    let articleId = req.params.id

    Article.findById(articleId).then((foundArticle) => {

        User.findById(foundArticle.author).then((user) =>{

            res.locals.article = foundArticle
            res.locals.user = user.username
            res.render('articles/details' )

        })



    })
}

module.exports.addPost = (req, res) =>{

    let newArticleObj = req.body


    Article.create({
        title: newArticleObj.title,
        description: newArticleObj.description,
        author: req.user._id
    }).then((article) => {

        User.findById(req.user._id).then((user) =>{

            user.articles.push(article._id)
            user.save()
            res.redirect('/')
        })

    })


}