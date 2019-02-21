const Product = require('../model/product.js');
const mongoose = require('mongoose');
const Category = require('../model/category.js');

const parsers = require('../libs/parsers.js');

module.exports = {

    getByCategory: function(req, res) {
        let id = req.params.id;
        Category.find({ _id: id }, (err, category) => {
            if (err) {
                return res.status(500).send("There was a problem with searching categories in DB.")
            }
            //let url = 'https:' + category[0].url + '?spm=a2g0v.33020208.103.1.5072Cm4yCm4yt9';
            let url = 'https:' + category[0].url;
            console.log(url);
            //console.log('https://ru.aliexpress.com/af/category/202000054.html?d=n&catName=cellphones-telecommunications&CatId=202000054&origin=n&isViewCP=y&jump=afs')
            parsers.getProducts.queue(url);
        });

    },








};