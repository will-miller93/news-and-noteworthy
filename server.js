// DEPENDENCY REQUIREMENTS
// require express
const express = require("express");
// require body parser
const bodyParser = require("body-parser");
// require handlebars
const hndbrs = require("express-handlebars");
// require path
const path = require("path");
// require mongoose
const mongoose = require("mongoose");

// creating express instance for app
const app = express();

// setting PORT for heroku deployment and default local host
const PORT = process.env.PORT || 3000

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

// maybe a static file to serve as client side.


// Mongoose Setup


// Routes


// Server Listener.
app.listen("PORT", function(err) {
    if (err) {
        console.log("There was an issue connecting to your server instance. Try again.");
    }
    else {
        console.log("App listening on PORT " + PORT);
    }
});