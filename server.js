const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000

// Middleware
const recipesController = require('./controllers/recipes.js')
app.use('/recipes', recipesController)

app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
