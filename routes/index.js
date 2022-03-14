const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  info = { message: 'Bienvenido al Bingo de la empresa El Gran Buda' }
  res.json(info);
});

module.exports = router;
