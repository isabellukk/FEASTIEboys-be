// Dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cors = require('cors')
require('./db/db')
const RecipeController = require('./controllers/recipe')
const authController = require('./controllers/auth')
const User = require('./models/User')



// Configurations
const app = express()
const PORT = process.env.PORT || 9000


// Middleware
const whiteList = ["http://localhost:3000"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(passport.initialize())
app.use('/auth', authController)
app.use('/:UserId/recipe', RecipeController)


app.post("/register", (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err)
        } else {
            res.send(createdUser)
        }
    })
})

// listener
app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
