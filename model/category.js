const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Crawler = require('crawler');
const cheerio = require('cheerio');



const categorySchema = new Schema({
    name: {
        type:String,
    },
    url:{
         type:String,
    },
}, { versionKey: false });
module.exports = mongoose.model('Category', categorySchema);