const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.js')
const { requireToken, handleValidateOwnership } = require('../middleware/auth')


router.get('/', requireToken, async (req, res) => {
  try {
    const foundRecipes = await Recipe.find().populate('creator', 'username').exec();
    res.status(200).json(foundRecipes)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const foundRecipes = await
    Recipe.findById(req.params.id).populate('creator').exec();
    res.status(200).json(foundRecipes)
  } catch(err) {
    res.status(400).json({ error: err.message})
  }
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


router.delete('/:id', requireToken, async (req, res) => {
  try {
    const deletedRecipe = await
    Recipe.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedRecipe)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', requireToken, async (req, res) => {
  try {
      handleValidateOwnership(req, await Recipe.findById(req.params.id))
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(updatedRecipe)
  } catch(err) {
      res.status(400).json({
        error: err.message
      })
  }
})

module.exports = router
