const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { createUserToken } = require('../middleware/auth')
const router = express.Router()

// Controller (DB interface)
// Register router
// Post ('/auth/register')
const register = async (req,res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt)
    req.body.password = passwordHash
    console.log(req.body.password);

    const newUser = await User.create(req.body)
    const {username, _id} = newUser
    console.log(newUser);
    res.status(201).json({
      currentUser: newUser,
      isLoggedIn: true

    })
  }catch(err){
    res.status(400).json({error: err.message})
  }
  // res.send('post register')
}

// Login Router
// Post ('/auth/login')
const login = async (req,res) => {
  try{
    const loggingUser = req.body.username
    const foundUser = await User.findOne({username: loggingUser})
    const token = await createUserToken(req, foundUser);
    console.log(token);
    res.status(200).json({
      user: foundUser,
      isLoggedIn: true,
      token: token
    })
  }catch(err){
    res.status(401).json({error: err.message})
  }
}


// Logout
// Get ('/auth/logout')

// Routing
router.post('/register', register)
router.post('/login', login)

module.exports = router
