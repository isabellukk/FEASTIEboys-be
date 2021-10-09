const recipebook = require('./controllers/recipebook.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000



// Middleware
app.use(express.json());
app.use('/recipes', recipebook)



app.listen(PORT, () => {
  console.log('✨✨', `It's a party on port ${PORT}`, '✨✨',);
})
