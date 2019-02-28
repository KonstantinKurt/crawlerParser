const Crawler = require('crawler');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const Category = require('../model/category.js');
const Product = require('../model/product.js');
const crawlerArray = require('./crawlerArray.js');
const methods = require('./methods');
//Parses product categories from AE 
let getCategories = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        $('a[href*="aliexpress.com/category/"]').each(function() {
            let link = $(this).attr('href');
            console.log(`Category ${methods.splitUrl(link,'name')} added to DB`);
            let newCategory = new Category({
                _id: new mongoose.Types.ObjectId(),
                name: methods.splitUrl(link, 'name'),
                url: link,
                originalID: methods.splitUrl(link, 'id'),
            });
            Category.findOne({ url: newCategory.url }, function(err, category) {
                err && res.status(404).send(`There was a problem to find category in DB.`);
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
        done();
    }
});
// Parses all products from AE by product category
let getProducts = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        let ref = $('div[class*=" "] a[href*="aliexpress.com/item/"][class*="product"]').attr('href');
        if (ref !== undefined) {
            let newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                refference: `https:${ref}`,
                name: $('a[href*="aliexpress.com/item/"][class*="product"]').attr('title'),
                price: $("[itemprop='price']").text(),
                image: $('img[class*="picCore pic-Core-v"]').attr('src'),
                lastParsed: new Date,
                originalId: `https:${$('div[class*=" "] a[href*="aliexpress.com/item/"][class*="product"]').attr('href')}`.split("/")[5].substring(0, 11),
            });
            Product.findOne({ refference: newProduct.refference }, function(err, product) {
                err && res.status(404).send(`There was a problem to find product in DB.`);
                if (!product) {
                    newProduct.save(function(err) {
                        err && console.log(err);
                        console.log(newProduct.originalId);
                        console.log(`Product ${newProduct.originalId} added to DB`);
                    });
                }
            });
        }
        done();
    }
});
// Proxy for all products from AE
getProducts.on('schedule',function(options){
    options.rateLimit = 1000;
    options.proxy = "http://5.79.113.168:3128";
});


let getProductById = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        let name = $('h1').text();
        let currentPrice = $('table[class*="adaptive"] tr').find("td").eq(3).text().slice(1);
        let priceHistory = [];
        $(".pcex table tr").each(function() {
            priceHistory.push({
                'date': $(this).find("td").eq(0).text(),
                'price': $(this).find("td").eq(1).text(),
            });
        });
        let newProduct = new Product({

        });
        console.log(`Name          ${name}`);
        console.log(`CurrentPrice          ${currentPrice}`);
        console.log(JSON.stringify(priceHistory));
        done();
    }
});




//Updates products by parsing pricearchive.org
let getProductsUpdate = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        let newName = $('h1').text();
        let currentPrice = $('table[class*="adaptive"] tr').find("td").eq(3).text().slice(1);
        let priceHistory = [];
        $(".pcex table tr").each(function() {
            priceHistory.push({
                'date': $(this).find("td").eq(0).text(),
                'price': $(this).find("td").eq(1).text(),
            });
        });
        // console.log(this.uri.split("/")[5].substring(0, 11));
        // console.log(newName);
        // console.log(currentPrice);
        console.log(typeof(cheerio.load(res.body)));
         console.log(cheerio.load(res.body));
        Product.findOne({ originalId: this.uri.split("/")[5].substring(0, 11) }, function(err, product) {
            err && res.status(404).send(`There was a problem to find product in DB.`);
            product.name = newName;
            product.price = currentPrice;
            product.history = priceHistory;
            //parsedHTML = cheerio.load(res.body);
            product.save(function(err) {
                err && console.log(err);
                console.log(`Product ${product.name} updated`);
                done();
            });

        });

    }
});
getProductsUpdate.on('schedule',function(options){
    options.rateLimit = 1000;
    options.proxy = "http://94.244.44.67:59374";
});





module.exports = {
    getCategories: getCategories,
    getProducts: getProducts,
    getProductsUpdate: getProductsUpdate,
    getProductById: getProductById,
    

};