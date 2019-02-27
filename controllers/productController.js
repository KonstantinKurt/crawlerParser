const Product = require('../model/product.js');
const mongoose = require('mongoose');
const Category = require('../model/category.js');

const parsers = require('../libs/parsers.js');
const crawlerData = require('../libs/crawlerArray.js');

module.exports = {

    parseByCategory: function(req, res) {
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

    parseAllProducts: function(req, res) {
        Category.find({}, (err, categories) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            //console.log(categories);
            for (let i = 0; i < categories.length; i++) {
                crawlerData.productQueryArray.push(`https:${categories[i].url}`);
                for (let j = 0; j < crawlerData.pagination; j++) {
                    crawlerData.productQueryArray.push(`https:${categories[i].url}`.slice(0, -5) + `/${j}.html`);
                }
            }
            parsers.getProducts.queue(crawlerData.productQueryArray);
        });

    },

    getAllProducts: function(req, res) {
        Product.find({}, (err, products) => {
            err && res.status(404).send("There was a problem with searching products in DB.");
            res.json({ status: "success", message: "All products in DB", data: products });
        });
    },
    getProductHistory: function(req, res) {
        let id = req.params.id;
        Product.findById({ _id: id }, (err, product) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            let stringToParse = `https://www.pricearchive.org/aliexpress.com/item/${product.refference.split("/")[5].substring(0,11)}`;
            console.log(stringToParse);
            parsers.getProductById.queue(stringToParse);
        });
    },
    getProductInfo: function(req, res) {
        Product.find({}, (err, products) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");

            for (let i = 0; i < products.length; i++) {
                crawlerData.productQueryArray.push(`https://www.pricearchive.org/aliexpress.com/item/${products[i].refference.split("/")[5].substring(0,11)}`);
                // console.log(`https://www.pricearchive.org/aliexpress.com/item/${products[i].refference.split("/")[5].substring(0,11)}`);
                // console.log(i);
            };
            console.log(crawlerData.productQueryArray.length);
            //console.log(crawlerData.productQueryArray);
            parsers.getProductInfo.queue(crawlerData.productQueryArray);
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    //  getProductsForDebug: function(req, res) {
    //     Product.find({}, (err, products) => {
    //         err && res.status(404).send("There was a problem with searching products in DB.");
    //         for (let i = 25; i < 35; i++) {
    //             crawlerData.productQueryArray.push(`https://www.pricearchive.org/aliexpress.com/item/${products[i].refference.split("/")[5].substring(0,11)}`);

    //         };
    //         console.log(crawlerData.productQueryArray);
    //         parsers.getProductsForDebug.queue(crawlerData.productQueryArray);
    //     });
    // },





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // getRefferences: function(req, res) {
    //     Category.find({}, (err, categories) => {
    //         err && res.status(404).send("There was a problem with searching categories in DB.");
    //         //console.log(categories);
    //         for (let i = 0; i < categories.length; i++) {
    //             crawlerData.productQueryArray.push(`https:${categories[i].url}`);
    //             for (let j = 0; j < crawlerData.pagination; j++) {
    //                 crawlerData.productQueryArray.push(`https:${categories[i].url}`.slice(0, -5) + `/${j}.html`);
    //             }
    //         }

    //         parsers.getRefferences.queue(crawlerData.productQueryArray);
    //     });

    // },
    // getProductsFullInfo: function(req, res) {
    //     Product.find({}, (err, products) => {
    //         err && res.status(404).send("There was a problem with searching categories in DB.");
    //         let counter = 0;
    //         for (let i = 0; i < products.length; i++) {
    //             crawlerData.productQueryArray.push(`https://www.pricearchive.org/aliexpress.com/item/${products[i].refference.split("/")[5].substring(0,11)}`);
    //         };
    //         parsers.getProductsFullInfo.queue(crawlerData.productQueryArray);
    //     });
    // },





};