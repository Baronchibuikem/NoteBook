import express from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import path from "path";
import cors from "cors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import morgan from "morgan";
import "dotenv/config";
import router from "./routes/router";
// For swagger ui documentation
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const dbName = process.env.MONGO_URI_FOR_DEVELOPMENT;

const connectDB = async () => {
  console.log("running connection....... for ", dbName);

  try {
    const conn = await mongoose.connect(dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Database error ${err.message}`);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: false }));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) =>
  res.json({
    message: "Welcome to the JotterApp Server Apis",
  })
);

// Api Routes

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", router);
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  Sentry.configureScope((scope) => {
    scope.setTag("user", req.userData ? req.userData : "");
    scope.setUser({
      email: req.userData && req.userData.email ? req.userData.email : "",
    });
  });
  console.log(error);
  Sentry.captureException(error.error);
  res.status(500).json({
    message: error.message,
  });
});

// eslint-disable-next-line no-unused-vars
if (process.env.NODE_ENV === "production") {
  // For serving my react client build index file
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// declaring port
const port = process.env.PORT;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}`));
