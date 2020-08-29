const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const countryRouter = require('./routes/country');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(indexRouter);
app.use(countryRouter);
app.use(errorController);

app.listen(4000, () => {
  console.log('REST Countries API App listening at PORT', 4000);
});
