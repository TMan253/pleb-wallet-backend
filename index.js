// import the Express library.
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

const usersRouter = require("./routers/usersRouter");
const lightningRouter = require("./routers/lightningRouter");

const { connect } = require("./lnd");


// Fetch .env file configs.
dotenv.config();

// create a new instance of the Express server.
const server = express();

// Use helmet middleware for security.
server.use(helmet());

// Use Morgan middleware for logging with the "common" logging format.
server.use(morgan("common"));

// Allow cross-origin requests [from all origins].
server.use(cors());

server.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // 100 calls per IP per window
}));

// Use the built-in JSON middleware to parse incoming JSON requests
server.use(express.json());

// Open a gRPC connection to LND.
connect();

// Set up a route to handle GET requests to the root path.
server.get("/", (req, res) => {
  // Send a JSON response with a "message" property sedt to "alive"
  res.status(200).json({ message: "alive" });
});

// Add page routes before server.listen().
server.use("/users", usersRouter);
server.use("/lightning", lightningRouter);

// set the server to listen on the provided port or default to 5500.
const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
  // log a message to the console when the server starts listening.
  console.log(`Express server listening on port ${PORT}`);
});


