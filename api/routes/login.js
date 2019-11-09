var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/login');

router.get('/', ctrlLogin.loadLogin);

router.get('/logout', ctrlLogin.logout);

router.post('/', ctrlLogin.login);

module.exports = router;