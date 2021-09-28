const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

// Create user Schema
const PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  content: {
    type: String,
    required: false,
  },
  draft: {
    type: Boolean,
    default: false,
  },
});

const post = mongoose.model("posts", PostSchema);
module.exports = post;
