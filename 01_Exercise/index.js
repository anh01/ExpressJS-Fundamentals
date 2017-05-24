/**
 * Created by Toni on 5/22/2017.
 */

let db = require('./storage')

db.put('first', 2)
db.save()
db.load()

console.log(db.get('first'))

