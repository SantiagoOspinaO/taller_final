const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/register', require('./routes/register'));
app.use('/authenticate', require('./routes/authenticate'));


/**
 * Se crea el puerto de salida para la aplicacion.
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port', port);
});

/**
 * Se crea la conexion con la base de datos
 */
mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));


module.exports = app;
