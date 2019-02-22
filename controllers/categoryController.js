const Category = require('../model/category.js');
const mongoose = require('mongoose');


const parsers = require('../libs/parsers.js');

module.exports = {

    parseAllCategories: function(req, res) {
       parsers.getCategories.queue('https://best.aliexpress.com/?lan=ru');

    },
    getAllCategories: function(req, res) {
       Category.find({}, (err, categories) => {
            err && res.status(404).send("There was a problem with searching categories in DB.");
            res.json({ status: "success", message: "All categories in DB", data: categories });
        });

    },

};