/**
 * Created by Toni on 6/10/2017.
 */
const User = require('../models/user')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {

    res.render('user/register')

}

module.exports.registerPost = (req, res) => {

    let user = req.body

    if(user.password && user.password !== user.confirmedPassword) {

        user.error = 'Passwords dont match!'
        res.render('user/register', user)
        return

    }

    let salt = encryption.generateSalt()
    user.salt = salt

    if (user.password) {

        let hashedPassword = encryption.generateHashedPassword(salt, user.password)
        user.password = hashedPassword

    }

    User.create(user).then((user) =>{

        req.logIn(user, (error, user) =>{

        if (error){

            res.render('user/register', {error: 'Invalid credentials!'})
            return

        }

        res.redirect('/')

    })

        }).catch(error => {


            user.error = error
        res.render('user/register', user)

    })
}

module.exports.loginGet = (req,res) =>{

    res.render('user/login')

}

module.exports.loginPost = (req, res) => {


    let userToLogin = req.body

    User.findOne ({username: userToLogin.username}).then(user=>{

        if(!user || !user.authenticate(userToLogin.password)){

            res.render('user/login', 'Invalid credentials!')

        }else{

            req.login(user, (error, user)=>{

                if (error) {

                    res.render('user/login', {error: 'Authentication not working!'})
                    return

                }

                res.redirect('/')

            })
        }
    })

}

module.exports.logout = (req, res) => {

    req.logout()
    res.redirect('/')

}