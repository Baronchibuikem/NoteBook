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
app.use("/api/v1", router);
// eslint-disable-next-line no-unused-vars

// sentry configuration

Sentry.init({
  dsn: "https://c53f1ce790bc410388da9ff45bdffcbe@o969053.ingest.sentry.io/5956187",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

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
