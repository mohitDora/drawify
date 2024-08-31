const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.String,  // Use String if you're using custom IDs
    ref: 'User',
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.String,  // Use String if you're using custom IDs
    ref: 'User'
  }]
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
