const axios = require("axios");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  // Ping API for Data on All Countries
  axios
    .get("https://restcountries.com/v3.1/all")
    .then(function (response) {
      const data = response.data;

      res.render("index", {
        countriesArr: data,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
