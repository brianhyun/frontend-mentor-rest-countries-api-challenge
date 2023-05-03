const axios = require("axios");
const express = require("express");

const router = express.Router();

const getLanguages = (obj) => {
  const itemArr = [];

  for (const property in obj.languages) {
    itemArr.push(obj.languages[property]);
  }

  return itemArr.join(", ");
};

router.get("/country/:code", async (req, res, _) => {
  // Ping API to Search for Specific Country
  const countryCode = req.params.code;
  const countryCodeURL =
    "https://restcountries.com/v3.1/alpha/" + countryCode.toLowerCase();

  const response = await axios.get(countryCodeURL);
  const countryObj = response.data[0];

  // Grab Languages
  const langStr = getLanguages(countryObj);

  // Convert Country Codes to Country Names (e.g. FRA -> France)
  const borderCountries = [];

  if (!countryObj.hasOwnProperty("borders")) {
    res.render("country", {
      country: countryObj,
      languages: langStr,
      borders: borderCountries,
    });
  } else {
    // Gather all the information for the border countries
    const promises = [];

    for (const borderCountryCode of countryObj.borders) {
      promises.push(
        axios
          .get(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`)
          .then(function (response) {
            borderCountries.push({
              name: response.data[0].name.official,
              code: response.data[0].cca2,
            });
          })
      );
    }

    Promise.all(promises)
      .then(function () {
        res.render("country", {
          country: countryObj,
          languages: langStr,
          borders: borderCountries,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

module.exports = router;
