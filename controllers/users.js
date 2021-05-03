import { newToken } from "../utils/auth";
import UserModel from "../models/UserModel";

// Load input validation
import validateRegisterInput from "../validations/register";
import validateLoginInput from "../validations/login";

export const register = async (req, res, next) => {
  // const { errors, isValid } = validateRegisterInput(req.body);
  try {
    const { email, firstName, lastName, password } = req.body;

    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const userExist = await UserModel.findOne({ email: req.body.email });

    if (userExist) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    const newUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      ...(password !== "" && { password: password }),
      ...(email !== "" && { email: email }),
    });

    // if the user was created, generate a token for him using the newToken method
    if (newUser) {
      const token = newToken(newUser);

      // convert to a object
      const val = newUser.toObject();
      // if val is true, destructure it and get the password(since we don't want to display the password to users)
      if (val) {
        const { password: p, ...rest } = val;
        return res.status(201).json({
          message: "User created successfully",
          token,
          data: {
            ...rest,
          },
        });
      }
    }
  } catch (error) {
    return next({
      message: "Registration failed",
      error: error,
    });
  }
};

export const login = async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      errors.email = "Invalid credentials";
      return res.status(404).json(errors);
    }

    // if user is found, check the password
    if (user) {
      const match = await user.checkPassword(password);
      if (!match) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
    }

    if (user) {
      // if a user is found, generate a token for that user
      const token = newToken(user);

      // remove the user password from the returned user instance
      const { password: p, ...rest } = user.toObject();

      // return a 200 status code with the user data, role, message and token
      return res.status(200).json({
        message: "Login successful",
        token,
        data: rest,
        useRole: user.useRole, // why did we add this if the userRole is part of the user object being returned
      });
    }
  } catch (error) {
    return next({
      message: "Couldn't log you in.",
      error: error,
    });
  }
};

// // For getting all user's in the database
// router.get("/", (req, res) => {
//   const errors = {};
//   User.find()
//     .then((users) => {
//       if (!users) {
//         errors.user_not_found = "User's not found";
//         return res.status(400).json(errors);
//       }
//       res.json(users);
//     })
//     .catch((err) => res.status(404).json({ users: "User's not found" }));
// });

// // Get a single user by id from the database
// router.get("/:user_id", (req, res) => {
//   console.log(req.params.user_id);
//   const errors = {};
//   User.findById({ _id: req.params.user_id })
//     .then((user) => {
//       if (!user) {
//         errors.user_not_found = "User not found";
//         return res.status(400).json({
//           errors,
//         });
//       }
//       res.json(user);
//     })
//     .catch((error) => {
//       res.status(400).json({
//         user: "user not found",
//       });
//     });
// });

// // For deleting a single user
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const id = req.params.id;
//     User.findByIdAndRemove(id, function (err, done) {
//       if (err) {
//         res.status(400).json({
//           not_deleted: "User could not be deleted",
//         });
//       } else {
//         res.status(200).json({
//           user_deleted: "User successfully deleted",
//         });
//       }
//     });
//   }
// );

// module.exports = router;
