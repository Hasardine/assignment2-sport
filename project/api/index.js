var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
var ctrlRegister = require('../controllers/register');
var ctrlUser = require('../controllers/user');
var ctrlLogin = require('../controllers/login');

//register
router.get('/register', ctrlRegister.get);
router.post('/register', ctrlRegister.post);


//user


//login



module.exports=router;