// Dependencies
const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
// const methodOverride = require('method-override');

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
	// useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is MongoDB not running?'));
db.on('connected', () => console.log('Mongo connected'));
db.on('disconnected', () => console.log('Mongo disconnected'));

// Middleware
// Body parser middleware: gives access to req.body
// app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// Route
app.get('/', (req, res) => {
    res.render('index.ejs');
})

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});