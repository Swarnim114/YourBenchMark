const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  testResults: {
    reactionTime: {
      noOfTests: Number,
      total: Number,
      min: Number,
      max: Number,
      avg: Number,
    },

    sequenceMemory: {
    noOfTests: Number,
    total: Number,
    min: Number,
    max: Number,
    avg: Number,
    },

    numberMemory: {
    noOfTests: Number,
    total: Number,
    min: Number,
    max: Number,
    avg: Number,
    },

    verBalMemory: {
    noOfTests: Number,
    total: Number,
    min: Number,
    max: Number,
    avg: Number,
    },

    aimTrainer: {
    noOfTests: Number,
    total: Number,
    min: Number,
    max: Number,
    avg: Number,
    },

    visualMemory: {
    noOfTests: Number,
    total: Number,
    min: Number,
    max: Number,
    avg: Number,
    },
  },
});

module.exports = mongoose.model('User', userSchema);
