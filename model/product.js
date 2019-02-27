const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contentSchema = new Schema({
    refference: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    lastParsed: {
        type: String,
        default: new Date(),
    },
    image: {
        type: String,
    },
    originalId: {
        type: String,
    },
    history: {
        type: Array,
        default: [],
    },
    parsedHTML: {
        type: String,
        default: "",
    },

}, { versionKey: false });
module.exports = mongoose.model('Product', contentSchema);