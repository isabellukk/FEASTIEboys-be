require('dotenv').config()
const express = require('express')
const app = express()
require('./db/db')
const PORT = process.env.PORT || 9000

// Resource Controller (router and controller callback)
const recipebook = require('./controllers/recipebook.js')


// Middleware
app.use(express.json());
app.use('/recipes', recipebook)



app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
