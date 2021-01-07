const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const Category = require("../../models/Category");
const Post = require("../../models/Post");

// Load input validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const category = require("../../models/Category");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user._id;
    console.log(req.user._id);
    Post.find({ user: userId })
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
    newPost.save().then((post) => res.json(post));
  }
);

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

// @route   GET api/posts/:id
// @desc    Get single post post
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
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
      res.status(404).json({ PostNotFound: "Couldn't get the requested post" })
    );
});
module.exports = router;
