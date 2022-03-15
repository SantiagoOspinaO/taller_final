const express = require('express');
const User = require('../models/user');
const router = express.Router();

/**
 * Se crea el request POST en el archivo register con el objetivo de registrar un nuevo usuario.
 * 
 * @version 1.00.00
 * 
 * @author Santiago Ospina Osorio <santiago.m200@outlook.es>
 * 
 * @since 1.00.000 14-03-2022
 */
router.post('/', (req, res, next) => {
    const { username, password } = req.body;
    const user = new User({ username, password});
    user.save( err => {
        if (err) {

            res.status(500).send('ERROR al registrar el usuario');
        } else {

            res.status(200).send('Usuario registrado');
        }
    });
});

module.exports = router;