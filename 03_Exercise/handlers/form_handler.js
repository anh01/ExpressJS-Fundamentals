/**
 * Created by apetrov on 5/29/2017.
 */
let qs = require('querystring')

module.exports = (req, res) => {

    if (req.method === 'POST') {

        let body = '';
        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function () {
            let data = qs.parse(body);
            console.log('ga')
            res.writeHead(200);
            res.end();
        });
    } else {
       return true
    }

}