const axios = require('axios');

/*
	Input: An object containing information specific to one country. (e.g. Afghanistan)

	Output: A string of languages spoken at that country delimited by commas. (e.g. 'Pashto, Uzbek, Turkmen')
*/ 

exports.returnLanguages = obj => {
	const itemArr = [];

	for (let i = 0; i < obj.languages.length; i++) {
		itemArr.push(obj.languages[i].name);
	}

	return itemArr.join(', ');
}

/*
	Input: An object containing information specific to one country. (e.g. Afghanistan)
		- Contains an array of all the border countries, with each country represented as a three-letter code (e.g. ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN']) that must be converted to its full name. 

	Output: An array of all the border countries to the queried country. (e.g. ['Iran', 'Pakistan', 'Turkmenistan', 'Uzbekistan', 'Tajikistan', 'China'])
*/ 

exports.returnBorderCountries = obj => {
	const borderCountries = [];
	const promises = [];

	for (let i = 0; i < obj.borders.length; i++) {
		// Convert Country Codes to Country Names (e.g. FRA -> France)
		let countryCode = obj.borders[i];

		promises.push(
			axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode) 
				.then(function (response) {
					borderCountries.push(response.data.name);
				})
		);
	}

	Promise.all(promises)
		.then(function () {
			console.log('BORDER COUNTRIES', borderCountries);
		})
		.catch(function (error) {
			console.error(error);
		});
	
	return borderCountries;
}