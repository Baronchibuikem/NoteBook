const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Create user Schema
const PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  text: {
    type: String,
    required: false,
    max: 2000,
  },
  draft: {
    type: Boolean,
    default: false,
  },
});

const post = mongoose.model("posts", PostSchema);
module.exports = post;
