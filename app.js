const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const countryRouter = require("./routes/country");
const errorRouter = require("./routes/error");

const app = express();

// Add middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors());

// Set up EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route Handling
app.use(indexRouter);
app.use(countryRouter);

// Error Routing
app.use(errorRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log("App listening at PORT", 4000)
);
