const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Team = require('../models/Team');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unsold players
router.get('/unsold', async (req, res) => {
  try {
    const players = await Player.find({ sold: false });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route for selling a player
router.post('/sell', async (req, res) => {
  try {
    const { playerId, name, position, team, price, modifiedTime } = req.body;

    // Validate team name exists in valid teams
    const validTeams = ['Barbarians', 'Giants', 'Pekkas', 'Wizards'];
    if (!validTeams.includes(team)) {
      return res.status(400).json({ message: 'Invalid team name' });
    }

    // Map team names to their colors
    const teamColors = {
      'Barbarians': 'bg-yellow-500',
      'Giants': 'bg-red-500',
      'Pekkas': 'bg-purple-500',
      'Wizards': 'bg-blue-500'
    };

    // Find and update player
    const player = await Player.findOneAndUpdate(
      { id: playerId },
      {
        name,
        position,
        team,
        price,
        modifiedTime,
        sold: true
      },
      { new: true, upsert: true }
    );

    // Update team wallet
    const updatedTeam = await Team.findOneAndUpdate(
      { name: team },
      { $inc: { wallet: -price } },
      { new: true }
    );

    if (!updatedTeam) {
      // If team not found, create it with initial wallet and color
      const newTeam = await Team.create({
        name: team,
        wallet: 25000 - price,
        color: teamColors[team]  // Add the color field
      });
      
      res.json({
        message: 'Player sold successfully',
        player,
        team: newTeam
      });
    } else {
      res.json({
        message: 'Player sold successfully',
        player,
        team: updatedTeam
      });
    }

  } catch (error) {
    console.error('Error in /sell route:', error);
    res.status(500).json({
      message: 'Error processing sale',
      error: error.message
    });
  }
});
  
module.exports = router; 
