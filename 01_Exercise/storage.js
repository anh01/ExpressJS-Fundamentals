/**
 * Created by Toni on 5/22/2017.
 */
let db = {};

function keyValidator(key) {

    if (typeof (key) !== 'string') {

        throw new Error('fuck that. Only string accepted.')
        return
    }

    if (db.hasOwnProperty(key)) {

        throw new Error('fuck that. This key is already in the db.')
        return
    }

    return true
}

let put = (key, value) => {

    if (keyValidator(key)) {
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

let update = () => {};

let deleteItem = () => {};

let clear = () => {};

let save = () => {};

let load = () => {};


module.exports = {

    put: put,
    get: get,

}