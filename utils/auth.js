import jwt from "jsonwebtoken";

export const newToken = (user) =>
  // we are generating a new token for a user, passing in our secret key and settting the
  // token to expire in 7days

  jwt.sign(
    {
      email: user.email,
      active: user.active,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

export const verifyToken = async (token) => {
  // we are verifying the token to ensure it is valid
  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    return verified;
  } catch (error) {
    return error;
  }
};

// for authenticating a user
export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    const decoded = await verifyToken(token);
    if (decoded) {
      req.userData = decoded;
    }
  } catch (error) {
    return res.status(401).json({
      message: "User Authentication Failed",
      error,
    });
  }
  next();
};
