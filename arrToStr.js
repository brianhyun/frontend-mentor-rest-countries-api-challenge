const https = require('https');

// resObjArr - country obj received from API

exports.getLanguages = resObjArr => {
  let itemArr = [];
  let itemStr = '';

  for (let i = 0; i < resObjArr[0].languages.length; i++) {
    itemArr.push(resObjArr[0].languages[i].name);
  }

  return itemStr = itemArr.join(', ');
}

exports.getBorderCountries = resObjArr => {
  let itemArr = [];
  let itemStr = '';

  for (let i = 0; i < resObjArr[0].borders.length; i++) {
    // convert country code into country name
    // e.g. FRA -> France

    // ping API to search by country code
    let borderCountryName = resObjArr[0].borders[i];
    let url = 'https://restcountries.eu/rest/v2/alpha/' + borderCountryName;
    https.get(url, (res) => {
      let body = "";
      let responseObj;

      res.on('data', (chunks) => {
        body += chunks;
      });

      res.on('end', () => {
        responseObj = JSON.parse(body);
        // push full country name into itemArr
        itemArr.push(responseObj.name);
        console.log(itemArr);
      });

      res.on('error', (error) => {
        console.log(error);
      });
    });
  }

  return itemStr = itemArr.join(', ');

}
