const { Schema, model } = require('mongoose');

module.exports = model('TravelLog', new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  place: {
    required: true,
    type: String
  },
  from: {
    required: true,
    type: Int32Array
  }
}))