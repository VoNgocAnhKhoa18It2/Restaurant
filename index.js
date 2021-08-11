const express = require('express');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + '/public'));
app.use(expressLayouts);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'mySecretKey',
    })
);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

app.get('/', (req, res) => {
    res.render("page/home", {
        title: "Home",
    })
})