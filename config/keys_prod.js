module.exports = {
  mongoURI: process.env.MONGO_URI_FOR_PRODUCTION || "mongodb://localhost/officemanagement",
  secretOrKey: process.env.SECRET_OR_KEY || "secretkey",
};
