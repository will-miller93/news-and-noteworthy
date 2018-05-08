// requiring mongoose.
const mongoose = require("mongoose");

// using mongoose's schema method to create an instance of the Schema
const Schema = mongoose.Schema;

// creating schema for article notes.
const noteSchema = new Schema = ({
    // title of each note when created. needs to be required.
    title: {
        type: String,
        required: true,
    },
    // body of each note as they are created. needs to be required.
    body: {
        type: String,
        required: true
    }
});

// create model from above schema using mongoose's model method.
const Note = mongoose.model("Note", noteSchema);

// export note model
module.exports = Note