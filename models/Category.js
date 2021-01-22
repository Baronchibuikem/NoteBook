const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Create user Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const category = mongoose.model("category", CategorySchema);
module.exports = category;
