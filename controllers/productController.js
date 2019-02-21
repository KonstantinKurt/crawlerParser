const Product = require('../model/product.js');
const mongoose = require('mongoose');
const Category = require('../model/category.js');

const parsers = require('../libs/parsers.js');

module.exports = {

    getByCategory: function(req, res) {
        let id = req.params.id;
        Category.find({ _id: id }, (err, category) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            //let url = 'https:' + category[0].url + '?spm=a2g0v.33020208.103.1.5072Cm4yCm4yt9';
            let urlsToParse = [];
            let url = 'https:' + category[0].url;
            urlsToParse.push(url);
            let numberOfPagesToParse = 10;
            let testUrl = "";
            for(let i = 2; i < numberOfPagesToParse; i++){
                urlsToParse.push(url.slice(0, -5)   + "/" + i + ".html");
                 // testUrl = url.slice(0, -5)   + "/" + i + ".html";
                 // parsers.getProducts.queue(testUrl);    
            }
            console.log(urlsToParse);
            parsers.getProducts.queue(urlsToParse);
        });

    },







};