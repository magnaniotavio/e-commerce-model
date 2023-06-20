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
/*content
title
classification
author
creation_date
last_edited
language */
/*let PostConfigurations = new Schema({
    newPost: {
        type: String
    },
    newClassification: {
        type: String
    },
    newTitle: {
        type: String,
        unique: [true],
    },
    creationDate: {
        type: Object
    },
    lastEdited: {
        type: Object
    },

    country: {
        type: Object
    },
    language: {
        type: Object
    },
    postNumber: {
        type: Number
    },
 //   todo_priority: {
 //       type: String
//    },
//    todo_completed: {
 //       type: Boolean
 //   }
}); */

module.exports = mongoose.model('Todo', PostConfigurations);
