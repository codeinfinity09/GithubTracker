const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  name: String,
  issues: Number,
  pullRequests: Number
});

module.exports = mongoose.model('Repo', repoSchema);
