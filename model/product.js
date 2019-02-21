const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contentSchema = new Schema({
    name: {
        type:String,
    },
    // price:{
    //      type:String,
    // },
}, { versionKey: false });
module.exports = mongoose.model('Product', contentSchema);