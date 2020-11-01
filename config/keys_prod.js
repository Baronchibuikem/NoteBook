module.exports = {
  mongoURI:
    process.env.MONGO_URI || "mongodb://localhost/officemanagement",
  secretOrKey: process.env.SECRET_OR_KEY || "secretkey",
};
