import path from "path";
import url from "url";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import indexRouter from "./routes/index.js";
import countryRouter from "./routes/country.js";
import errorRouter from "./routes/error.js";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
