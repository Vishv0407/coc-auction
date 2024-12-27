const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
    enum: ['co-leader', 'elder', 'member']
  },
  sold: {
    type: Boolean,
    default: false
  },
  team: {
    type: String,
    enum: ['Barbarians', 'Giants', 'Pekkas', 'Wizards', null],
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
  modifiedTime: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Player', playerSchema); 