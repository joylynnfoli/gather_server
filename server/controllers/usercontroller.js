let express = require('express')
let router = express.Router()
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let db = require('../db')
const User = db.import('../models/user')

//register
router.post('/register', (req, res) =>{
    User.create({
        email: req.body.user.email, 
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then((user) => {
        console.log(user)
        let token = jwt.sign( {id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24} );
        res.status(200).json({
            user: user,
            message: "user create worked",
            sessionToken: token
        })
    })
    .catch((err) => {
        console.log("failed to save a user" )
        res.status(500).json({
                err: "register did not work"
        })
    })
})
//login
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then((user) => {
        console.log(user)
        let token = jwt.sign( {id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24} );
        res.status(200).json({
            user: user,
            message: "user login worked",
            sessionToken: token
        })
    })
    .catch((err) => {
        console.log("failed to login user" )
        res.status(500).json({
                err: "login did not work"
        })
    })
})
module.exports = router