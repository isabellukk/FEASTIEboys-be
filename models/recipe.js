const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  ingredients: {type: Array},
  directions: {type: String},
  img: {type: String}
})

module.exports = mongoose.model('Recipe', recipeSchema)
