const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema({
  name: String,
  count: Number,
  available: Boolean,
  costPerHead: Number,
  content: String,
  subtitle: String,
  images: [String],
});

const adventures_details = mongoose.model("adventure_detail", adventureSchema);
module.exports = adventures_details;
