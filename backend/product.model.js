const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductConfigs = new Schema({
    name: {
        type: String
    },
    classification: {
        type: String
    },
    sizeSML: {
        type: String
    },
    sizeNumber: {
        type: String
    },
    color: {
        type: String
    },
    brand: {
        type: String
    },
    customerReview: {
        type: Array
    },
    price: {
        type: Number
    },
    creationDate: {
        type: String
    },
    lastEdited: {
        type: String
    },
    popularity: {
        type: String
    },
    number: {
        type: Number
    },
    popularity: {
        type: String
    },
    condition: {
        type: String
    },
    availability: {
        type: String
    },
    description: {
        type: String
    },
    targetPublic: {
        type: String
    },
    
});

module.exports = mongoose.model('Product', ProductConfigs);
