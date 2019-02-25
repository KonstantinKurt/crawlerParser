const Crawler = require('crawler');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const Category = require('../model/category.js');
const Product = require('../model/product.js');
const crawlerArray = require('./crawlerArray.js');
const methods = require('./methods');

let getCategories = new Crawler({
    maxConnections: 1,
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

let getProducts = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
            let newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                refference: `https:${$('div[class*=" "] a[href*="aliexpress.com/item/"][class*="product"]').attr('href')}`,
                name: $('a[href*="aliexpress.com/item/"][class*="product"]').attr('title'),
                price: $("[itemprop='price']").text(),
                image: $('img[class*="picCore pic-Core-v"]').attr('src'),
                lastParsed: new Date,
            });
            
            Product.findOne({ refference: newProduct.refference }, function(err, product) {
                err && res.status(404).send(`There was a problem to find product in DB.`);
                if (!product) {
                    newProduct.save(function(err) {
                        err && console.log(err);
                        console.log(`Product ${newProduct.refference} added to DB`);
                    });
                }
            });
        
        done();
    }
});

let getProductInfo = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        let name = $('h1').text();
        let currentPrice = $('table[class*="adaptive"] tr').find('td:contains($)').text().slice(1);
        let priceHistory = [];
        $(".pcex table tr").each(function() {
            priceHistory.push({
                'date': $(this).find("td").eq(0).text(),
                'price': $(this).find("td").eq(1).text(),
            });
        });
        let newProduct = new Product({
             
        });
        // Product.findOne({}, function(err,product){
        //     err && res.status(404).send(`There was a problem to find product in DB.`);

        // });
        console.log(`Name          ${name}`);
        console.log(`CurrentPrice          ${currentPrice}`);
        console.log(JSON.stringify(priceHistory));
        done();
    }
});

let getProductsHistory = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {
        err && console.log(err);
        $ = cheerio.load(res.body);
        let name = $('h1').text();
        let currentPrice = $('table[class*="adaptive"] tr').find('td:contains($)').text().slice(1);
        let priceHistory = [];
        $(".pcex table tr").each(function() {
            priceHistory.push({
                'date': $(this).find("td").eq(0).text(),
                'price': $(this).find("td").eq(1).text(),
            });
        });
        let newProduct = new Product({
             
        });
        //ADD UPDATE MANY;
        console.log(`Name          ${name}`);
        console.log(`CurrentPrice          ${currentPrice}`);
        console.log(JSON.stringify(priceHistory));
        done();
    }
});






module.exports = {
    getCategories: getCategories,
    getProducts: getProducts,
    getProductInfo: getProductInfo,
    getProductsHistory: getProductsHistory,
};