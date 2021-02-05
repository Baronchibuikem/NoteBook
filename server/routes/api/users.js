const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const User = require("../../models/UserModel");

// Load input validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log("......new user loading");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
    console.log("new user saved............");
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          admin: user.isAdmin,
        }; // Create JWT Payload

        // Sign Token
        const accessToken = jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "6h" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// For getting all user's in the database
router.get("/", (req, res) => {
  const errors = {};
  User.find()
    .then((users) => {
      if (!users) {
        errors.user_not_found = "User's not found";
        return res.status(400).json(errors);
      }
      res.json(users);
    })
    .catch((err) => res.status(404).json({ users: "User's not found" }));
});

// Get a single user by id from the database
router.get("/:user_id", (req, res) => {
  console.log(req.params.user_id);
  const errors = {};
  User.findById({ _id: req.params.user_id })
    .then((user) => {
      if (!user) {
        errors.user_not_found = "User not found";
        return res.status(400).json({
          errors,
        });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(400).json({
        user: "user not found",
      });
    });
});

// For deleting a single user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, function (err, done) {
      if (err) {
        res.status(400).json({
          not_deleted: "User could not be deleted",
        });
      } else {
        res.status(200).json({
          user_deleted: "User successfully deleted",
        });
      }
    });
  }
);

module.exports = router;
