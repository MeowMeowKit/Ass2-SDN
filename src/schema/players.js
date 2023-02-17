const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nation: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  isCaptain: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
