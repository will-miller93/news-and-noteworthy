// requiring mongoose
const mongoose = require("mongoose");

// using the Schema method on Mongoose to create and instance of the schema each time new article is scraped.
const Schema = mongoose.Schema;

// schema for each article as they are being scraped. 
const articleSchema = new Schema ({
    // title, should be required and unique
    title: {
        type: String,
        required: true,
        unique: true,
    },
    // the short description is the teaser of the article. needs to be required.
    shortDescription : {
        type: String,
        required: true,
    },
    // saved should be a boolean. this is to control if the article will be saved. default should be false.
    saved: {
        type: Boolean,
        default: false
    },
    // needs to be able to put notes for each article.
    // they should be objects within an array.
    // each note should be accessed by the schema in the other file.
});

// using the Schema method on mongoose to create a model from the schema above.
const Article = mongoose.model("Article", articleSchema);

// export Article model.
module.exports = Article;