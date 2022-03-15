const express = require('express');
const User = require('../models/user');
const router = express.Router();

/**
 * Se crea el request POST en el archivo authenticate con el objetivo de autentificar
 * las credenciales de cada usuario.
 * 
 * @version 1.00.00
 * 
 * @author Santiago Ospina Osorio <santiago.m200@outlook.es>
 * 
 * @since 1.00.000 14-03-2022
 */
router.post('/', (req, res, next) => {

    const { usernmae, password } = req.body;

    User.findOne({usernmae}, (err, user) => {
        if (err) {
            res.status(500).send('ERROR al autenticar al usuario');
        } else if (!user) {
            res.status(500).send('El usuario no existe');

        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('ERROR al autenticar al usuario');
                } else if (result) {
                    res.status(200).send('Usuario autenticado correctamente');
                } else {
                    res.status(500).send('Usuario y/o contraseña incorrecta');
                }
            });
        }
    });
});

module.exports = router;