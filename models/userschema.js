const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
  
    unique: true,
  },
});

const users = mongoose.model('users', userSchema);

module.exports = users;
