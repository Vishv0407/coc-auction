const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific team by name
router.get('/:name', async (req, res) => {
  try {
    const team = await Team.findOne({ 
      name: req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1) 
    }).populate('members');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update team wallet
router.patch('/:name/wallet', async (req, res) => {
  try {
    const { amount } = req.body;
    const team = await Team.findOneAndUpdate(
      { name: req.params.name },
      { $inc: { wallet: -amount } },
      { new: true }
    );
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 