const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
// For swagger ui documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

// Connect to MongoDB

const connectDB = require("./db/connection");
connectDB();

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// import routes
// Api Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  // For serving my react client build index file
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// declaring port
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
