const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, default: 'Very Delicious!'},
  ingredients: {type: Object},
  directions: {type: Object},
  img: {type: String}
})

module.exports = mongoose.model('Recipe', recipeSchema)
