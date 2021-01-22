const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// for graphql
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const app = express();
// For swagger ui documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// import database
const connectDB = require("./db/connection");

// graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

// Connect to MongoDB
connectDB();

// import routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
// Api Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

// For serving my react client build index file
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// declaring port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
