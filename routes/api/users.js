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
    } else {
      const Role = {}
      if(req.body.roleGroup){
        Role.roleGroup = req.body.roleGroup
      }
      if(req.body.roleName){
        Role.roleName = req.body.roleName
      }
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,        
        password: req.body.password,
        role: Role

      });

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
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
// router.post("/login", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   User.findOne({ email }).then((user) => {
//     // Check for user
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//     }
//     // Check Password
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         // User Matched
//         const payload = { id: user.id, name: user.name, email: user.email }; // Create JWT Payload

//         // Sign Token
//         const accessToken = jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: "6h" },
//           (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token,
//             });
//           }
//         );
//       } else {
//         errors.password = "Password incorrect";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });



module.exports = router;
