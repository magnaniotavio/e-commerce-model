const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostConfigurations = new Schema({
    content: {
        type: String
    },
    title: {
        type: String
    },
    classification: {
        type: String
    },
    author: {
        type: String,
        unique: [true],
    },
    creation_date: {
        type: Object
    },
    last_edited: {
        type: Object
    },
    language: {
        type: Object
    },
}); 