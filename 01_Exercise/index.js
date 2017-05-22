/**
 * Created by Toni on 5/22/2017.
 */

let db = require('./storage')

db.put('first', 5)

console.log(db.get('first'))