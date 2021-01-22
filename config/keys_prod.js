module.exports = {
  mongoURI: process.env.MONGOURI || "mongodb://localhost/officemanagement",
  secretOrKey: process.env.SECRET_OR_KEY || "secretkey",
};
