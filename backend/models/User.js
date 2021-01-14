const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
  sub: {
    required: true,
    type: String
  },
  admin: {
    required: true,
    type: Boolean
  }
}));