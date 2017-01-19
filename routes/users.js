var express = require('express');
var router = express.Router();
var User = require('../models/user');
var UserService = require('../services/user_service');

router.post('/register', function(req, res, next) {

    UserService.register(req.body.email, req.body.password, req.body.username)
    .then(user => {
        res.json({ 'success': user });
    })
    .catch(error => {
        res.json({ 'error': error });
    });
});

router.post('/login', function(req, res, next) {
    
    UserService.login(req.body.email, req.body.password)
    .then(user => {
        res.json({ 'success': user });
    })
    .catch(error => {
        res.json({ 'error': error });
    });
});

module.exports = router;
