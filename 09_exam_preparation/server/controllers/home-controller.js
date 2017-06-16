<<<<<<< HEAD
const threadsExtract = require('./thread-controller').list

module.exports = {
  index: (req, res) => {

    threadsExtract().then(threads =>{

        res.render('home/index', {
            threads: threads
        })

    })

          },
=======
const indexThreads = require('./thread-controller').getIndexData

module.exports = {

    index: (req, res) => {

indexThreads().then((indexThreads) => {

    res.render('home/index', {

      threads: indexThreads
    })

})

    },
>>>>>>> origin/master
  about: (req, res) => {
    res.render('home/about')
  }


}
