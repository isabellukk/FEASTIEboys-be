const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createUserToken, requireToken} = require("../middleware/auth")
const router = express.Router()

//Controllers (DB INTERFACE)
//Register Route
//post
const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        const passwordStore = req.body.password
        req.body.password = passwordHash
        const newUser = await User.create(req.body)
        console.log(newUser)

        if (newUser) {
            req.body.password = passwordStore
            const authenticatedUserToken = createUserToken(req, newUser)
            res.status(201).json({
                user: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken
            })
        } else {
            res.status(400).json({ error: 'something went wrong new user' })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//login
const login = async (req, res) => {
    try {
        const loggingUser = req.body.user
        const foundUser = await User.findOne({ user: loggingUser })
        const token = await createUserToken(req, foundUser)
        console.log(token)

        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token: token
        })

    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

// post login

//logout

//get logout
router.get( "/logout", requireToken, async (req, res) => {
    try {
      const currentUser = req.user.username
      delete req.user
      res.status(200).json({
        message: `${currentUser} currently logged in`,
        isLoggedIn: false,
        token: "",
      });
    } catch (err) {
      res.status(400).json({ error: `check user ${err.message}`});
    }
})

//Routing
router.post('/register', register)
router.post('/login', login)

module.exports = router
