const express = require('express');
const router = express.Router();
const TransactionLog = require('../models/TransactionLog');

// Get all transaction logs
router.get('/', async (req, res) => {
  try {
    const logs = await TransactionLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new transaction log
router.post('/', async (req, res) => {
  const log = new TransactionLog({
    playerName: req.body.playerName,
    playerId: req.body.playerId,
    codolioLink: req.body.codolioLink,
    soldTo: req.body.soldTo,
    price: req.body.price,
    action: req.body.action
  });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 