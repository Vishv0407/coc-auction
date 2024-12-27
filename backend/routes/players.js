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
      const { playerId, team, price, name, position, modifiedTime } = req.body;
  
      console.log('Received request:', { playerId, team, price, name, position, modifiedTime }); // Debug log
  
      // Validate input
      if (!playerId || !team || !price || !name || !position || !modifiedTime) {
        return res.status(400).json({
          message: 'Missing required fields: playerId, team, price, name, and position are required'
        });
      }
  
      // Check if the player exists
      let player = await Player.findOne({ id: playerId });
  
      if (!player) {
        // Create new player if doesn't exist
        player = new Player({
          id: playerId,
          name: name,
          position: position,
          sold: true,
          team: team,
          price: price,
          modifiedTime: modifiedTime
        });
        await player.save();
      } else {
        // Update existing player
        player.sold = true;
        player.team = team;
        player.price = price;
        await player.save();
      }
  
      // Update the team's wallet and add player to members
      const updatedTeam = await Team.findOneAndUpdate(
        { name: team },
        {
          $inc: { wallet: -price },
          $addToSet: { members: player._id } // Use $addToSet to prevent duplicates
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedTeam) {
        throw new Error('Team not found');
      }
  
      res.json({
        message: 'Player sold successfully',
        player,
        team: updatedTeam
      });
    } catch (error) {
      console.error('Error in /sell route:', error); // Debug log
      res.status(500).json({
        message: 'Error processing sale',
        error: error.message
      });
    }
  });
  
module.exports = router; 
