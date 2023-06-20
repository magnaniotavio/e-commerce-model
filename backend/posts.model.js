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
    },
    creation_date: {
        type: mongoose.Schema.Types.Mixed
    },
    last_edited: {
        type: mongoose.Schema.Types.Mixed
    },
    language: {
        type: mongoose.Schema.Types.Mixed
    },
}); 

module.exports = mongoose.model('Post', PostConfigurations);
