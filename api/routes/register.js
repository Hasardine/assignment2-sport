var express = require('express');
var router = express.Router();
var ctrlRegister = require('../controllers/register');

router.get('/', ctrlRegister.loadRegister);

router.post('/', ctrlRegister.register);

module.exports = router;