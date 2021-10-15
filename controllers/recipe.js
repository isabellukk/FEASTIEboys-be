const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const User = require('../models/User')
const { requireToken, handleValidateOwnership } = require('../middleware/auth')

// index
router.get('/', requireToken, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user._id)
    const usersRecipes = await Recipe.find({creator: foundUser._id})
    res.status(200).json(usersRecipes)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})

// show
router.get('/:id', async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.user._id).poulate('creator').exec()
    const query = {recipe: foundRecipe._id}
    res.status(200).json({recipe: foundRecipe})
  } catch(err) {
    res.status(400).json({ error: err.message})
  }
})
 // create
router.post('/', requireToken, async (req, res) => {
  try {
    req.body.creator = req.user._id
    const newRecipe = await Recipe.create(req.body);
    res.status(200).json(newRecipe)
  } catch(err) {
    res.status(400).json({error: err.message})
  }
})

// delete
router.delete('/:id', requireToken, async (req, res) => {
  try {
    const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteRecipe)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})

// update
router.put('/:id', requireToken, async (req, res) => {
  try {
      handleValidateOwnership(req, await Recipe.findById(req.params.id))
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(updatedRecipe)
  } catch(err) {
      res.status(400).json({
        error: err.message })
  }
})

module.exports = router
