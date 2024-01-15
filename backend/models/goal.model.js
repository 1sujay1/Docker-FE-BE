const mongoose = require("mongoose");

module.exports = mongoose.model(
  "goal",
  mongoose.Schema({
    text: String,
  })
);
