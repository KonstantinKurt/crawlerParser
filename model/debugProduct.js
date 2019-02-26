const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const debugSchema = new Schema({
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
    cheerio: {
       type: String,
       default: "",
    },
    
}, { versionKey: false });
module.exports = mongoose.model('debugProduct', debugSchema);