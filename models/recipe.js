const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  ingredients: {type: Object},
  directions: {type: String},
  img: {type: String}
})

module.exports = mongoose.model('Recipe', recipeSchema)
