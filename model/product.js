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
}, { versionKey: false });
module.exports = mongoose.model('Product', contentSchema);