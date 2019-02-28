const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
}, { versionKey: false });

module.exports = mongoose.model('Profile', profileSchema);