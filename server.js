const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded( {extended: true} ));

app.get('/', (req, res) => {

  https.get('https://restcountries.eu/rest/v2/all', (res) => {
    let data = [];

    res.on('data', (chunk) => {
      // each chunk is a buffer object
      // each buffer object is pushed into the array
      data.push(chunk);
    });

    // a buffer object is a way of representing information in the form of a sequence of bytes

    res.on('end', () => {
      // .concat joins all the buffer objects in the data array into one buffer object
      let resBody = Buffer.concat(data);
      let resObj = JSON.parse(resBody);
    });

    res.on('error', (error) => {
      console.log(error);
    });
  });

  res.render('index', {

  });
});

app.listen(PORT, () => {
  console.log('REST Countries API App listening at PORT', PORT);
});
