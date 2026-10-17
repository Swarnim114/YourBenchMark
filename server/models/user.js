const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

    verbalMemory: {  // Fixed spelling here
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

// Hash the password whenever it is set or changed (register and PATCH)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Older accounts were stored in plaintext: accept them once, then save a hash
userSchema.methods.checkPassword = async function (candidate) {
  if (!this.password.startsWith('$2')) {
    if (candidate !== this.password) return false;
    this.markModified('password');
    await this.save();
    return true;
  }
  return bcrypt.compare(candidate, this.password);
};

// Never send the password hash back in API responses
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
