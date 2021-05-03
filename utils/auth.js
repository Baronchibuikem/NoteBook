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

export const verifyToken = (token) => {
  // we are verifying the token to ensure it is valid
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) return reject(error);
      resolve(payload);
    });
  });
};

// for authenticating a user
export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    const decoded = await verifyToken(token);

    if (decoded && decoded.active) {
      req.userData = decoded;
    } else {
      return res.status(401).json({
        message: "User is not Active",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "User Authentication Failed",
      error,
    });
  }
  next();
};
