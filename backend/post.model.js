const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostConfigurations = new Schema({
    content: {
        type: mongoose.Schema.Types.Mixed
    },
    title: {
        type: mongoose.Schema.Types.Mixed
    },
    classification: {
        type: mongoose.Schema.Types.Mixed
    },
 /*   author: {
        type: mongoose.Schema.Types.Mixed,
    }, */
 //   creation_date: {
 //       type: mongoose.Schema.Types.Mixed
 //   },
 //   last_edited: {
 //       type: mongoose.Schema.Types.Mixed
 //   },
 //   language: {
 //       type: mongoose.Schema.Types.Mixed
 //   }, 
}); 

module.exports = mongoose.model('Post', PostConfigurations);
