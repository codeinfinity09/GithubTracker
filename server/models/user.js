const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
  repos: Array
});

module.exports = mongoose.model('User', userSchema);
