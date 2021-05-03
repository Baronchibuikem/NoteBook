import { newToken } from "../utils/auth";
import UserModel from "../models/UserModel";

// Load input validation
import validateRegisterInput from "../validations/register";
import validateLoginInput from "../validations/login";

// for registering a user
export const register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

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

// for authenticating and login a user in
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

// for getting all the user in the database
export const getAllUsers = async (req, res, next) => {
  let errors = {};
  try {
    const users = await UserModel.find();
    if (!users) {
      errors.user_not_found = "No registered user's found";
      return res.status(400).json(errors);
    }

    return res.status(200).json({
      data: users,
      message: "success",
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// for getting a user by id
export const getUserById = async (req, res, next) => {
  let errors = {};
  const { userId } = req.params;
  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      errors.user_not_found = "User not found";
      return res.status(400).json({
        errors,
      });
    }
    return res.status(200).json({
      data: user,
      message: "success",
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// for deleting a user from the database
export const deleteUser = async (req, res, next) => {
  let errors = {};
  const { userId } = req.params;
  try {
    const user = await UserModel.findByIdAndRemove({ _id: userId });

    return res.status(200).json({
      message: "successfully deleted",
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};
