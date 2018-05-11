// There arent any dependencies in this page. this is all jquery event listeners ( all on click events. )

// scrape page for new articles
$("scrape-articles").on("click", function(){
    $.ajax({
        method: "GET",
        URL: "/api/scrape"
    }).then(function(err, data){
        if (err) {
            console.log("There was an error with the scraper ajax request");
            console.log(err);
        } else {
            console.log(data);
            location.reload();
        }
    });
}); 

// save an article
$(document).on("click", ".saveArticle", function(){
    const articleId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        URL: "/api/articles/save" + articleId
    }).then(function(err, savedArticle){
        if (err) {
            console.log("There was an error in the Post ajax request to save an article");
            console.log(err);
        } else {
            console.log(savedArticle);
            location.reload();
        }
    });
});

// unsave an article
    // Post ajax to unsave an article
$(document).on("click", ".unsaveArticle", function(){
    const articleId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        URL: "/api/articles" + articleId
    }).then(function(err, unsavedArticle){
        if (err) {
            console.log("There was an error in the Post ajax request to unsave an article");
            console.log(err);
        } else {
            console.log(unsavedArticle);
            location.reload();
        }
    });
});


// add a note to an article
    // simply an on click to add to the article note list
$(document).on("click", ".addNote", function(){
    const articleId = $(this).attr("data-id");
    const noteContent = {
        title: $(this).siblings("input.newNote-header").val().trim(),
        body: $(this).siblings("input.newNote").val().trim()
    };

    $.post("api/articles/:" + articleId + "", function(){
        console.log("Note Added");
    }).then(function(err, addedNote){
        if (err) {
            console.log("There was an error in scrapes.js when adding a new note.");
            console.log(err);
        } else {
            console.log("Added Note");
            console.log(addedNote);
            location.reload();
        }
    });

});

// remove a note to an article
    // another on click event to delete a note from an article
$(document).on("click", ".removeNote", function(){
    const articleId = $(this).attr("attr-id");

    $.post("api/articles/remove/:" + articleId + "", function(){
        console.log("Note Removed!");
    }).then(function(err, removedNote){
        if (err) {
            console.log("There was an error in scrapes.js when removing a note.");
            console.log(err);
        } else {
            console.log("Removed Note:");
            console.log(removedNote);
            location.reload();
        }
    });
});

// update a note on an article
    // another on click event to update a note from an article
$(document).on("click", ".updateNote", function(){
    const articleId = $(this).attr("attr-id");
    const noteContent = {
        title: $(this).siblings("form").children("input").val().trim(),
        body: $(this).siblings("form").children("textarea").val().trim()
    };

    $.post("api/articles/update/:" + articleId + "", function(){
        console.log("Note Updated");
    }).then(function(err, updatedNote){
        if (err) {
            console.log("There was an error in scrape.js when updating a note.");
            console.log(err);
        } else {
            console.log("Updated Note:");
            console.log(updatedNote);
            location.reload();
        }
    })

});