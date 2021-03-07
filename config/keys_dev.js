console.log("value of env", process.env.MONGO_URI_FOR_DEVELOPMENT);
module.exports = {
  mongoURI: process.env.MONGO_URI_FOR_DEVELOPMENT,
  secretOrKey: process.env.SECRET_OR_KEY,
};
