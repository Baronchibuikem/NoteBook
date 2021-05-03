const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// Load user model
const Category = require("../models/Category");
const Post = require("../models/Post");

// for getting all the post the current logged in user created
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user._id;
    Post.find({ owner: userId })
      .sort({ date: 1 })
      //   .populate("user", "name")
      .populate({
        path: "category",
        select: { name: 1 },
      })
      .populate({
        path: "owner",
        select: { firstName: 1, lastName: 1 },
      })
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ PostsNotFound: "Couldn't get all post from the database" })
      );
  }
);

// For creating a post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // // check validation
    // if (!isValid) {
    //   // if any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      owner: req.user.id,
      category: req.body.category,
    });
    console.log(newPost);
    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) =>
        res.status(404).json({ PostNotPosted: "Couldn't send your post" })
      );
  }
);

// For creating a category
router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newCategory = new Category({
      name: req.body.name,
      user: req.user.id,
    });
    newCategory.save().then((category) => res.json(category));
  }
);

// For fetching post created by the logged in user
router.get(
  "/category",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user._id;
    try {
      response = await Category.find({ user: userId });
      res.json(response);
    } catch (error) {
      res.status(404).json({
        PostsNotFound: "Couldn't get all all category from the database",
      });
    }
  }
);

// @route   GET api/posts/:id
// @desc    Get single post post
// @access  Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ owner: req.user.id })
      // .then((post) => {
      //   console.log(post);
      // })
      // for getting the name of the user from the list of comments posted
      .populate({
        path: "category",
        select: { name: 1 },
      })
      .populate({
        path: "owner",
        select: { firstName: 1, lastName: 1 },
      })
      .then((post) => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ nopostfound: "No post found with that ID" });
        }
      })
      .catch((err) =>
        res
          .status(404)
          .json({ PostNotFound: "Couldn't get the requested post" })
      );
  }
);

// For deleting a post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // here we get the post by id created by the user
    Post.findOne({ owner: req.user.id })
      .then((post) => {
        // We confirm that the post owner id is equal to the id of the user making the request
        if (post.owner.toString() !== req.user.id) {
          res.status(401).json({ notauthourized: "user not authourized" });
        }
        // We remove the post from the database
        post.remove();
        res.status(200).json({ success: true });
      })
      .catch((err) =>
        res.status(404).json("Couldn't find the post on the server")
      );
  }
);

module.exports = router;
