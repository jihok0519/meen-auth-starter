// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// DATABASE CONNECTION ERROR/SUCCESS
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
// BODY PARSER MIDDLWARE: GIVE US ACCESS TO REQ.BODY
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride('_method'));

// ROUTES/CONTROLLERS
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        });
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        });
    }
});

// LISTENERS
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});