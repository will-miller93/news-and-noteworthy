// DEPENDENCY REQUIREMENTS
const express = require("express");
const bodyParser = require("body-parser");
const hndbrs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan")

// Handlebars setup
app.engine("handlebars", hndbrs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// creating express instance for app
const app = express();

// setting PORT for heroku deployment and default local host
const PORT = process.env.PORT || 3000

// Morgan logger setup
app.use(logger("dev"));

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

// maybe a static file to serve as client side.
app.use(express.static("public"));

// Mongoose Setup
mongoose.connect('mongodb://localhost/news_noteworthyDB');

// Routes
// might need to move the scraper here as well as the get request for getting articles from the database.

// Server Listener.
app.listen("PORT", function(err) {
    if (err) {
        console.log("There was an issue connecting to your server instance. Try again.");
    }
    else {
        console.log("App listening on PORT " + PORT);
    }
});