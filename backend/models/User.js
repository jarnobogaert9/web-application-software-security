const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

module.exports = model('User', new Schema({
  sub: {
    required: true,
    type: String
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
}));