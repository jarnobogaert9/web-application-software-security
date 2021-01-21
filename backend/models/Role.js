const { Schema, model } = require('mongoose');

module.exports = model('Role', new Schema({
  type: {
    required: true,
    type: String
  }
}));