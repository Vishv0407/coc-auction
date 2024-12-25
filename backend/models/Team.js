const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    enum: ['Barbarians', 'Giants', 'Pekkas', 'Wizards'],
    required: true 
  },
  color: { type: String, required: true },
  wallet: { type: Number, default: 10000 },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

module.exports = mongoose.model('Team', teamSchema); 