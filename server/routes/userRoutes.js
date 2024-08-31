const express = require('express');
const User = require('../models/user');
const Board = require('../models/board');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const {uid}=req.body
    const isUser = await User.findOne({_id:uid})
    if(isUser) return
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
