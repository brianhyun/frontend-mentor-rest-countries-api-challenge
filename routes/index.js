const express = require('express');
const axios = require('axios');
const queryString = require('qs');

const router = express.Router(); 

router.get('/', (req, res, next) => {
	// Ping API for Data on All Countries
	const allCountriesURL = 'https://restcountries.eu/rest/v2/all';

	axios.get(allCountriesURL)
		.then(function (response) {
			const data = response.data; 

			res.render('index', {
				countriesArr: data
			});
		})
		.catch(function (error) {
			console.error(error);
		});
});

module.exports = router; 