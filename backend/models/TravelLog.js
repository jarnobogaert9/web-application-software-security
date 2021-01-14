const { Schema, model, Mongoose } = require('mongoose');
const mongoose = require('mongoose');

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
  // from: {
  //   required: true,
  //   type: Number
  // },
  // to: {
  //   required: true,
  //   type: Number
  // },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}))