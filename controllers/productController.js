const Product = require('../model/product.js');
const mongoose = require('mongoose');
const Category = require('../model/category.js');

const parsers = require('../libs/parsers.js');
const crawlerData = require('../libs/crawlerArray.js');

module.exports = {

    getByCategory: function(req, res) {
        let id = req.params.id;
        Category.findById({ _id: id }, (err, category) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            let startUrl = `https:${category.url}`;
            console.log(startUrl);
            crawlerData.productQueryArray.push(startUrl);
            for (let i = 2; i < crawlerData.pagination; i++) {
                crawlerData.productQueryArray.push(startUrl.slice(0, -5) + "/" + i + ".html");
            }
            parsers.getProducts.queue(crawlerData.productQueryArray);
        });

    },

    getAllProducts: function(req, res) {
        Category.find({}, (err, categories) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            //console.log(categories);
            for (let i = 0; i < categories.length; i++) {
                crawlerData.productQueryArray.push(`https:${categories[i].url}`);
                for (let j = 0; j < crawlerData.pagination; j++) {
                    crawlerData.productQueryArray.push(`https:${categories[i].url}`.slice(0, -5) + `/${j}.html`);
                }
            }
            console.log(crawlerData.productQueryArray);
            parsers.getProducts.queue(crawlerData.productQueryArray);
        });

    },







};