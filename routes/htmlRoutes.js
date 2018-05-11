// Dependency Requirements
const express = require("express");
const htmlRouter = express.Router();
// requiring index here
const db = require("../models/index");


// get request for "/"
// this shows the "home page" and all of the articles being scraped from the page.
// this is finding all of the articles in the database where saved = false and printing them to the page.
htmlRouter.get("/", function(req, res){
    // finding all of the articles in the database where saved is false
    db.Article.find({saved: false}, function(err, posts){
        if (err) {
            // if there was an error then the error and the message will be logged to the console.
            console.log(err);
            console.log("there was an error in the htmlRouter request to render the articles.");
        } else {
            // rendering the articles pulled from the database to index.handlebars
            res.render('index', {article: posts});
        }
    });
});

// get request for "/saved"
// this shows all of the articles that are being saved 
// this is finding all of the articles in the database where the saved value is true and printing them to the page.
htmlRouter.get("/saved", function(req, res){
    // finding all of the articles in the database where saved is true
    db.Article.find({saved: true})
        // using populate to populate all of the articles from the database where saved is true with their notes.
        .populate("notes")
        // promise after the articles are populated
        .then(function(err, posts){
            if (err) {
                // if there was an error finding the saved articles or populating them then this message and the error will be logged to the console.
                console.log("There was an error getting the saved articles from the database");
                console.log(err);
            } else {
                // if there were no errors in finding or populating the articles then the posts and the message will be console logged
                console.log("Here are the saved posts");
                console.log(posts);
                // rendering all of the saved articles to saved.handlebars 
                res.render('saved', {article: posts});
            }
        });
});

// exporting the html router.
module.exports = htmlRouter