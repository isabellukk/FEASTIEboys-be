const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  ingredients: {type: Array},
  directions: {type: String},
  img: {type: String},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Recipe', recipeSchema)
