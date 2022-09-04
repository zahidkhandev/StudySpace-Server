const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    author: { type: String },
    subject: { type: String },
    description: { type: String },
    categories: { type: Array },
    thread: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", DoubtSchema);
