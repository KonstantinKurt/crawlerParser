const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const refferenceSchema = new Schema({
    refference: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
}, { versionKey: false });
module.exports = mongoose.model('Refference', refferenceSchema);