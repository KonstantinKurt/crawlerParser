const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parsers = require('./libs/parsers.js');
const Crawler = require('crawler');
const cheerio = require('cheerio');

const Product = require('./model/product.js');
const crawler = require('./libs/crawlerAE.js');
const config = require('./config.js');

const AliExpressSpider = require('aliexpress');

const categoryRouter = require('./routes/categoryRouter.js');
const productRouter = require('./routes/productRouter.js');


app.use('/', categoryRouter);
app.use('/', productRouter);








//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// crawler.getRefferences(crawlerArray.getArrToFindRefferenceOnPage());
// setTimeout(function(){console.log(crawlerArray.getRefferencesArray())}, 5000);

//crawler.getProducts(crawlerArray.getArray());
// Product.find({}, (err, products) => {
//     if (err) {
//         return res.status(500).send("There was a problem with searching posts in DB.")
//     }
//    console.log('All products in DB');
//    console.log(products);
// });

//crawler.getPriceArchiveInfo();



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// AliExpressSpider.Search({
//   keyword: 'sony',
//   page: 2
// }).then(function(d){
//    console.log('d', d)
// });
// let arrUrl = crawlerArray.getArray();
// //console.log(arrUrl);
// let arrProductId = [];
// let queveArr = [];
// for (let i = 0; i < arrUrl.length; i++) {
//     AliExpressSpider.Detail(arrUrl[i])
//         .then(function(detail) {
//                 //console.log('good detail', detail);
//                 //console.log(detail.productId);
//                 arrProductId.push(detail.productId);
//                 queveArr.push('https://www.pricearchive.org/aliexpress.com/item/' + detail.productId);
//             },
//             function(reason) {
//                 //console.log(reason);
//             });
// };



// setTimeout(function() { console.log(arrProductId); }, 10000);

// setTimeout(function() { console.log(queveArr); }, 11000);



// let getArchiveInfo = new Crawler({
//     maxConnections: 10,
//     //jQuery: false,
//     callback: function(err, res, done) {

//         if (err) {
//             console.log(err);
//         } else {
//             $ = cheerio.load(res.body);

//             let resName = $("h1").text();
//             let resPrice = $("td:contains('US')").text();
//             console.log(resName);
//             console.log(resPrice);
//             let newProduct = new Product({ _id: new mongoose.Types.ObjectId(), name: resName, price: resPrice });
//             Product.findOne({ name: newProduct.name }, function(err, product) {
//                 if (err) {
//                     return res.status(500).send("There was a problem to find product in DB.");
//                 }
//                 if (!product) {
//                     newProduct.save(function(err) {
//                         if (err) {
//                             return console.log(err);
//                         }
//                     });
//                 } else {
//                     if (product.price != newProduct.price) {
//                         let id = product._id;
//                         Product.findOneAndUpdate(id, { price: newProduct.price }, function(err, user) {
//                             if (err) {
//                                 return console.log(err);
//                             }
//                         });
//                     }
//                 }
//             });


//         };

//         done();
//     }
// });


// setTimeout(function() { getArchiveInfo.queue(queveArr); }, 15000);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




























app.get('/', (req, res) => {
    res.send('Works OK');

});














mongoose.connect(config.DBconnectionString, { useNewUrlParser: true }, function(err) {
    if (err) {
        return console.log(err);
    } else {
        console.log('Database connected succesfully!');
    }
    app.listen(config.PORT, () => {
        console.log(`Express запущен на http://localhost:'  ${config.PORT}  '; нажмите Ctrl+C для завершения.`);
    });
});