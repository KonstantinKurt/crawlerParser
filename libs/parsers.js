const Crawler = require('crawler');
const Product = require('../model/product.js');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const Category = require('../model/category.js');
const crawlerArray = require('./crawlerArray.js');

let getCategories = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {

        if (err) {
            console.log(err);
        } else {
            $ = cheerio.load(res.body);

            $('a[href*="category/202"]').each(function() {
                let refferenceUrl = $(this).attr('href');
                console.log(refferenceUrl);
                let refferenceName = $(this).text();
                let newCategory = new Category({ _id: new mongoose.Types.ObjectId(), name: refferenceName, url: refferenceUrl });
                Category.findOne({ url: newCategory.url }, function(err, category) {
                    if (err) {
                        return res.status(500).send("There was a problem to find category in DB.");
                    }
                    if (!category) {
                        crawlerArray.categoryArray.push(category);
                        newCategory.save(function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                });
            });

        };

        done();
    }
});

let getProducts = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {

        if (err) {
            console.log(err);
        } else {
            $ = cheerio.load(res.body);
            // $('. product ').each(function() {
            //     let productName = $(this).attr('href');
            //     let newProduct = new Product({ _id: new mongoose.Types.ObjectId(), name: productName});
            //     newProduct.save(function(err) {
            //         if (err) {
            //             return console.log(err);
            //         }
            //         //console.log(newProduct.name, 'saved');
            //     });

            // });
            $('a[href*="aliexpress.com/item/"][class*=" product"]').each(function() {
                let productRefference= $(this).attr('href');
                console.log(productRefference);
                let productName= $(this).attr('title');
                console.log(productName);
                let newProduct = new Product({ _id: new mongoose.Types.ObjectId(), refference: productRefference, name: productName, });
                Product.findOne({ name: newProduct.name }, function(err, product) {
                    if (err) {
                        return res.status(500).send("There was a problem to find product in DB.");
                    }
                    if (!product) {
                        newProduct.save(function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                });
            });

        };
        done();
    }
});








module.exports = {
    getCategories: getCategories,
    getProducts: getProducts,
};