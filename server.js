const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const arrToStr = require(__dirname + '/arrToStr.js');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded( {extended: true} ));

app.get('/', (req, res) => {
  // ping API to search for all countries
  const url = 'https://restcountries.eu/rest/v2/all';

  https.get(url, (response) => {
    let data = [];

    response.on('data', (chunk) => {
      // each chunk is a buffer object
      // each buffer object is pushed into the array
      data.push(chunk);
    });

    // a buffer object is a way of representing information in the form of a sequence of bytes

    response.on('end', () => {
      // .concat joins all the buffer objects in the data array into one buffer object
      let responseBody = Buffer.concat(data);
      let responseObj = JSON.parse(responseBody);

      res.render('index', {
        countriesArr: responseObj
      });
    });

    response.on('error', (error) => {
      console.log(error);
    });
  });
});

app.post('/country', (req, res) => {
  // ping API to search by country name
  const countryName = req.body.country;
  const url = 'https://restcountries.eu/rest/v2/name/' + countryName + '?fullText=true';

  https.get(url, (response) => {
    let body = "";

    response.on('data', (chunks) => {
      body += chunks;
    });

    response.on('end', () => {
      let responseObj = JSON.parse(body);

      // grab languages
      let langStr = arrToStr.getLanguages(responseObj);

      // grab border countries
      let borderCountriesStr = arrToStr.getBorderCountries(responseObj);
      // console.log(borderCountriesStr);

      // send data over to country.ejs
      res.render('country', {
        specificCountry: responseObj,
        languages: langStr,
        borders: borderCountriesStr
      });
    });

    response.on('error', (error) => {
      console.log(error);
    });
  });
});

app.listen(PORT, () => {
  console.log('REST Countries API App listening at PORT', PORT);
});
