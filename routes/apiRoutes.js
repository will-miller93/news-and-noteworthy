// Requiring dependencies
const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

// Scrape Page and Add to Database
    // get request for scrapes // scrape page and add to database
    // inside is create request to add article to database.
apiRouter.get("/scrape", function() {
    
})
 
// Save Article
    // post request to save
    // updates post to "saved"
apiRouter.post("/articles/saved/:id", function(req, res) {
    db.Article.update({_id: req.params.id}, {$set: {saved: true}}, function(err, posts){
        if (err) {
            console.log(err);
            console.log("Something went wrong with saving an article.");
        }
        else {
            console.log(posts);
            console.log("Post Saved");
        }
    });
    res.send("Post Saved");
}); 

// unsave an article
    // post request to unsave
    // updates post to "unsaved"
apiRouter.post("/articles/unsaved/:id", function(req, res) {
    db.Article.update({_id: req.params.id}, {$set: {saved: false}}, function(err, posts){
        if (err) {
            console.log(err);
            console.log("Something went wrong with unsaving an article.")
        }
        else {
            console.log(posts);
            console.log("Post Unsaved");
        }
    });
    res.send("Post Unsaved.");
})

// Create new note
    // Post request to create
    // find article by id
    // create note and give id to access and be connected to the article in the database.
    // you need to  be able to update them as well. for making the note editable.
apiRouter.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(newNote){
        // find article and update notes array...
        return db.Article.findOneAndUpdate()
    })
})

// Remove Note
    // Post request to find then remove from database
    // another post to update note
apiRouter.post("/articles/:id", function(req, res) {
    // find article by article id and then access the notes by their respective ids and delete the note by its respective id.
    
})
module.exports = apiRouter;