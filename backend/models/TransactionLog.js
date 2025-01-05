const mongoose = require('mongoose');

const transactionLogSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  },
  codolioLink: {
    type: String,
    required: false
  },
  soldTo: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    enum: ['sell', 'update'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TransactionLog', transactionLogSchema); 