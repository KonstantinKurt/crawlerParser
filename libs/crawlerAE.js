const Crawler = require('crawler');
const Product = require('../model/product.js');
const mongoose = require('mongoose');
const cheerio = require('cheerio');


const crawlerArray = require('./crawlerArray.js');



let getProduct = new Crawler({
    maxConnections: 1,
    //jQuery: false,
    callback: function(err, res, done) {

        if (err) {
            console.log(err);
        } else {
            $ = cheerio.load(res.body);

            let resName = $("[itemprop='name']").text();
            let resPrice = $('#j-sku-price').text();
            //let name = $('h1[data-spm-anchor-id]');
            

            let newProduct = new Product({ _id: new mongoose.Types.ObjectId(), name: resName, price: resPrice });
            //console.log(newProduct);
            Product.findOne({ name: newProduct.name }, function(err, product) {
                if (err) {
                    return res.status(500).send("There was a problem to find product in DB.");
                }
                if (!product) {
                    newProduct.save(function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        //console.log('Product added succsesfully!');
                    });
                } else {
                    if (product.price != newProduct.price) {
                    	let id = product._id;
                        Product.findOneAndUpdate(id, { price: newProduct.price }, function(err, user) {
                            if (err) {
                               //console.log('Product updated succsesfully!');
                            }
                        });
                    }
                }
            });

            
        };

        done();
    }
});

let getReferencesOnProducts = new Crawler({
    maxConnections: 1,
    callback: function(err, res, done) {

        if (err) {
            console.log(err);
        } else {
            $ = cheerio.load(res.body);
            let refferenceOnProduct = $("[itemprop='name']").text();
            //console.log(refferenceOnProduct);
            crawlerArray.refferenceArray.push(refferenceOnProduct);
            
        };

        done();
    }
});


let getInfoFromPriceArchieve = new Crawler({
    maxConnections: 1,
    function(err, res, done) {

        if (err) {
            console.log(err);
        } else {
            $ = cheerio.load(res.body);
            let input = $("input[name = q]").val();
            console.log(input);
         
        };

        done();
    }



});

let getPriceArchiveInfo = function(){
    getInfoFromPriceArchieve.queue('https://www.pricearchive.org/aliexpress.com/item/32881445343');
};


let getRefferences = function(arr){
   getReferencesOnProducts.queue(arr);
};
let getProducts = function(arr){
    getProduct.queue(arr);
};




module.exports =  {
	getPriceArchiveInfo: getPriceArchiveInfo,
	getProducts: getProducts,
	getRefferences: getRefferences,
    
};