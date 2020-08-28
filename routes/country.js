const express = require('express');
const axios = require('axios');
const queryString = require('qs');

const arrToStr = require('../library/arrToStr.js');

const router = express.Router();

router.get('/country/:name', (req, res, next) => {
	// Ping API to Search for Specific Country 
	const countryName = req.params.name;
	const countryURL = 'https://restcountries.eu/rest/v2/name/' + countryName + '?fullText=true';

	axios.get(countryURL)
		.then(function (response) {
			// Grab Languages
			let langStr = arrToStr.getLanguages(response);

			// Grab Border Countries
			let borderCountriesStr = arrToStr.getBorderCountries(response);

			// send data over to country.ejs
			res.render('country', {
				specificCountry: response,
				languages: langStr,
				borders: borderCountriesStr
			});
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router; 