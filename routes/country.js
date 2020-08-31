const express = require('express');
const axios = require('axios');
const queryString = require('qs');

const library = require('../utils/library.js');

const router = express.Router();

router.get('/country/:code', (req, res, next) => {
	// Ping API to Search for Specific Country 
	const countryCode = req.params.code;
	const countryCodeURL = 'https://restcountries.eu/rest/v2/alpha/' + countryCode;

	axios.get(countryCodeURL)
		.then(function (response) {
			const countryObj = response.data;

			// Grab Languages
			const langStr = library.returnLanguages(countryObj);

			// Convert Country Codes to Country Names (e.g. FRA -> France) 
			const borderCountries = [];

			if (countryObj.borders.length === 0) {
				borderCountries.push({name: 'None', code: countryObj.alpha2Code});

				res.render('country', {
					country: countryObj,
					languages: langStr,
					borders: borderCountries
				});
			} else {
				const promises = [];

				for (let i = 0; i < countryObj.borders.length; i++) {
					let countryCode = countryObj.borders[i];
	
					promises.push(
						axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode) 
							.then(function (response) {
								const borderCountry = {
									name: response.data.name, 
									code: response.data.alpha2Code
								}
								borderCountries.push(borderCountry);
							})
					);
				}

				Promise.all(promises)
				.then(function () {
					res.render('country', {
						country: countryObj,
						languages: langStr,
						borders: borderCountries
					});
				})
				.catch(function (error) {
					console.error(error);
				});
			}
		})
		.catch(function (error) {
			console.error(error);
		});
});

module.exports = router; 