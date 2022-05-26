// DEPENDENCIES
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

// NEW (REGISTRATION PAGE)
userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// CREATE (REGISTRATION ROUTE)
userRouter.post('/', (req, res) => {
    // overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
   User.create(req.body, (error, createdUser) => {
        res.redirect('/');
   });
});

// EXPORT USER ROUTER
module.exports = userRouter;