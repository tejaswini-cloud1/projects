
const passport = require("passport");
const express = require("express");

var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index.ejs');
});

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('pages/profile.ejs', {
        user: req.user
    });
});

router.get('/error', isLoggedIn, function (req, res) {
    res.render('pages/error.ejs');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
}));

router.get('/logout', function (req, res) {
    req.logout(function(err) {
        if (err) {
            console.log(err);
            return next(err); // Pass the error to Express's error handler
        }
        res.redirect('/');
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;
