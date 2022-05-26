// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');

// NEW (LOGIN PAGE)
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// DELETE (LOGOUT ROUTE)
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

// CREATE (LOGIN ROUTE)
sessionsRouter.post('/', (req, res) => {
    // CHECK FOR AN EXISTING USER
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        // SEND ERROR MESSAGE IF NO USER IS FOUND
        if (!foundUser) {
            res.send(`Oops! No user with that email address has been registered.`);
        } else {
            // IF A USER HAS BEEN FOUND
            // COMPARE THE GIVEN PASSWORD WITH THE HASHED PASSWORD WE HAVE STORED
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            // IF THE PASSWORDS MATCH
            if (passwordMatches) {
                // ADD THE USER TO OUR SESSION
                req.session.currentUser = foundUser;
                // REDIRECT BACK TO OUR HOME PAGE
                res.redirect('/');
            } else {
                // IF THE PASSWORD DON'T MATCH
                res.send('Oops! Invalid credentials.');
            }
        }
    });
});

// EXPORT SESSIONS ROUTER
module.exports = sessionsRouter;