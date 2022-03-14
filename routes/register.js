const express = require('express');
const User = require('../models/user');
const router = express.Router();

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

router.post('/', (req, res, next) => {


});


module.exports = router;