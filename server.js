require('dotenv').config()


const express = require('express')
const passport = require('passport')
const app = express()
const cors = require('cors')
require('./db/db')
const PORT = process.env.PORT || 9000
const recipebookController = require('./controllers/recipebook')
const authController = require('./controllers/auth')

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};



// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize())

// Auth Controller Middleware
app.use('/auth', authController)
app.use('/recipes', recipebookController)



app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
