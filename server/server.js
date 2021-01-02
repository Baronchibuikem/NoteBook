const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

// for graphql
const {graphqlHTTP} = require('express-graphql')
const schema = require("./graphql/schema")

// For swagger ui documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// import routes
const users = require("./routes/api/users");

// import database
const connectDB = require("./db/connection");

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(passport.initialize());

// graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// Connect to MongoDB
connectDB();


// Api Routes
app.use("/api/users", users);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// declaring port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
