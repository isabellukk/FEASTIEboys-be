const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.js')

router.get('/', (req, res) => {
  res.send('index')
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(200).json(newRecipe)
  } catch(err) {
    res.status(400).json({
      error: err.message
    })
  }
})




module.exports = router
