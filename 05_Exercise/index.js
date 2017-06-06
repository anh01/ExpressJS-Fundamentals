/**
 * Created by Toni on 6/2/2017.
 */
const db = require('./config/database')
const instanodeDb = require('./modules/instanode-db')


db().then(() =>{

    // instanodeDb.saveImage({ url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    //     description: 'such cat much wow',
    //     tags: ['cat', 'kitty', 'cute','catstagram'] })


    // let search = instanodeDb.findByTag('cat')
    //
    // search.then((result) =>{
    //
    //     console.log(result)
    // })
    //
    //     search.catch((error) => {
    //
    //     console.log(error)
    // })


    // let filter = instanodeDb.filter().then((result) => {
    //
    //     console.log(result)
    // }).catch((error) =>{
    //
    //     console.log(error)
    // })

})




