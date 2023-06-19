const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const countryRouter = require("./routes/country");
const errorRouter = require("./routes/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(indexRouter);
app.use(countryRouter);

// Error Routing
app.use(errorRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("App listening at PORT", 4000);
});
