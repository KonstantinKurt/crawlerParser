const Crawler = require('crawler');
const Product = require('../model/product.js');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const Category = require('../model/category.js');


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
            $('. product j-p4plog').each(function() {
                let productName = $(this).attr('href');
                let newProduct = new Product({ _id: new mongoose.Types.ObjectId(), name: productName});
                newProduct.save(function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(newProduct.name, 'saved');
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