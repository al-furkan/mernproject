const mongoose = require('mongoose');

// Create a User schema

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: String,
    address: String
  });
  // Create a User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;