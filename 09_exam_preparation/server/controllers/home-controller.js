const threadsExtract = require('./thread-controller').list

module.exports = {
  index: (req, res) => {

    threadsExtract().then(threads =>{

        res.render('home/index', {
            threads: threads
        })

    })

          },
  about: (req, res) => {
    res.render('home/about')
  }


}
