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

    // Check if player already exists
    const existingPlayer = await Player.findOne({ id: playerId });
    const isUpdate = existingPlayer && existingPlayer.sold;

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

    // Emit socket event with operation type
    req.app.get('io').emit('playerUpdated', { 
      ...player.toObject(),
      operation: isUpdate ? 'update' : 'sold'
    });

    res.json({
      message: isUpdate ? 'Player updated successfully' : 'Player sold successfully',
      player,
      team: updatedTeam
    });

  } catch (error) {
    console.error('Error in /sell route:', error);
    res.status(500).json({
      message: 'Error processing sale',
      error: error.message
    });
  }
});
  
module.exports = router; 
