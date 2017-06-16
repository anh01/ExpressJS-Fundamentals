
const threadsExtract = require('./thread-controller').list
const indexThreads = require('./thread-controller').getIndexData


module.exports = {

    index: (req, res) => {

indexThreads().then((indexThreads) => {

    res.render('home/index', {

      threads: indexThreads
    })

})

    },

  about: (req, res) => {
    res.render('home/about')
  }


}
