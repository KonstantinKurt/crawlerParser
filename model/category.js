const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Crawler = require('crawler');
const cheerio = require('cheerio');

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    originalID: {
        type: String,
        require: true,
    },
}, { versionKey: false });
module.exports = mongoose.model('Category', categorySchema);