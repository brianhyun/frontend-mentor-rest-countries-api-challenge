const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Fetching data from API...");
  console.log("Request URL: https://restcountries.com/v3.1/all");

  axios
    .get("https://restcountries.com/v3.1/all")
    .then(function (response) {
      const data = response.data;

      res.render("index", {
        countriesArr: data,
      });
    })
    .catch(function (error) {
      console.error("Error fetching data:", error.message);
      res
        .status(500)
        .send("Error fetching data from the API. Please try again later.");
    });
});

module.exports = router;
