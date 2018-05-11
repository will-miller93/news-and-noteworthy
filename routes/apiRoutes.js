// Requiring dependencies
const express = require("express");
const apiRouter = express.Router();
const cheerio = require("cheerio");
const request = require("request");
const db = require("../models/index");

// Scrape Page and Add to Database
apiRouter.get("/scrape", function(req, res){
    // scrape request for the newyorktimes world news section.
    request("https://www.nytimes.com/section/world/", function(req, res){
        // setting the loaded html from cheerio to the contant $
        const $ = cheerio.load(html);

        $("div.story-body").each(function (i, element) {
            // finding the link from the html elements provided by the scrape
            const link = $(element)
            .children('a')
            .attr('attr')
            // finding the title of each article from the html elements provided by the scrape
            const title = $(element)
            .find($(".headline"))
            .text()
            // finding the short description of each article from the html elements provided by the scrape
            const shortDescription = $(element)
            .find($(".summary"))
            .text()

            // creating a new article in the article database
            db.Article.create({
                // creating the format for each articles in the article database.
                title: title,
                link: link,
                shortDescription: shortDescription
            }).then(function(dbArticle){
                // console logging the articles as they are scraped
                console.log("scrape complete");
                console.log(dbArticle);
            // catch promise to find and catch any errors in the scrape
            }).catch(function(err){
                // console logging errors if they are found
                console.log("something went wrong with the scrape");
                console.log(err);
            });
        });
    });
});
 
// Save Article
// post request to articles/saved/:id
apiRouter.post("/articles/saved/:id", function(req, res) {
    // updating the article in the article database. finding the article by its id and then changing status to true.
    db.Article.update({_id: req.params.id}, {$set: {saved: true}}, function(err, posts){
        if (err) {
            // console logging the errors if errors are found
            console.log("Something went wrong with saving an article.");
            console.log(err);
        }
        else {
            // if no errors are found then console logging posts from saved articles
            console.log("Post Saved");
            console.log(posts);
        }
    });
    // res.status(200).end();
    res.send("Post Saved");
}); 

// unsave an article
// post request to articles/unsaved/:id
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
    // res.status(200).end();
    res.send("Post Unsaved.");
})

// Create new note
// post request to /articles/:id
apiRouter.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(newNote){
        // in this return you may need to put quotes around $push and notes
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: newNote._id}});
    }).catch(function(err){
        console.log(err);
        console.log("There was an error creating a new note.");
    });
    // res.status(200).end();
    res.send("New note created");
});

// Remove Note
// post request to /remove/:id
apiRouter.post("/notes/remove/:id", function(req, res) {
    // find article by article id and then access the notes by their respective ids and delete the note by its respective id.
    db.Note.find({_id: req.params.id}, function(err, results){
        if (err) {
            // console logging the errors if there are any found.
            console.log("Couldn't find the article by id in the remove note post request");
            console.log(err);
        } else {
            //console logging the article that was found from its id
            console.log("This is the article");
            console.log(results);
        }
        // promise off of find
    }).then(function(data){
        // console log for testing
       console.log(data);
       // in this return you may need to put quotes around $pull and notes
       // returning the updated note to the article it was attached to in the article database
       return db.Article.update({_id: data[0].article}, {$pull: {notes: req.params.id}})
    }).then(function(removedNote){
        // console logging removed note for testing
        console.log(removedNote);
        // returning the removal of the note to the note database
        return db.Note.remove({_id: req.params.id})
    });
    // res.status(200).end();
    res.send("Note Removed");
});

// update note
// post to update/:id
apiRouter.post("/notes/update/:id", function(req, res){
    // using findOneAndUpdate to find a note by its _id and the using $set to allow changes to title and body
    db.Note.findOneAndUpdate({_id: req.params.id}, {$set: {title: req.body.title, body:req.body.body}
        //promise to find the updated note and console log it.
    }).then(function(updatedNote){
        console.log("Newly Updated Note on Article");
        console.log(updatedNote);
        // catching errors with .catch will log if error is found in request.
    }).catch(function(err){
        console.log("There was a problem with updating the note.");
        console.log(err);
    });
    // res.status(200).end();
    res.send("Note Updated")
});

// exporting the apiRouter
module.exports = apiRouter;