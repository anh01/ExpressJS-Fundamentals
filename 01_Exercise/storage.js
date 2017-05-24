/**
 * Created by Toni on 5/22/2017.
 */

const fs = require('fs')
let db = {};

function keyValidator(key) {

    if (typeof (key) !== 'string') {

        throw new Error('fuck that. Only string accepted.')
        return
    }


    return true
}

let put = (key, value) => {

    if (keyValidator(key)) {

        if (db.hasOwnProperty(key)) {

            throw new Error('fuck that. This key is already in the db.')
            return
        }

        db[key] = value
    }


};

let get = (key) => {

    if (typeof(key) == 'string') {

        if (!db.hasOwnProperty(key)) {

            throw new Error('fuck that. Key does not exists.')
        }

        return db[key]
    }

};

let update = (key, value) => {

    if (keyValidator(key)) {

        if (!db.hasOwnProperty(key)) {

            throw new Error('fuck that. Key does not exists.')
        }

        db[key] = value
    }

};

let deleteItem = (key) => {

    if (keyValidator(key)) {

        if (!db.hasOwnProperty(key)) {

            throw new Error('fuck that. Key does not exists.')
        }

        delete db[key]
    }

};

let clear = () => {

    db = {}
};

let save = () => {

    let jsonFile = JSON.stringify(db)

    fs.writeFile('./storage.dat', jsonFile, (err) => {

        if (err) {

            return console.log(err)
        }

        return console.log('Db backup finished')
    })

};

let load = () => {

    fs.readFile('./storage.dat', 'utf8', (err, data) => {

        if (err) {

            return console.log(err)
        }

        db = JSON.parse(data)

    })

}


module.exports = {

    put: put,
    get: get,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load

}