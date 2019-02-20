const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const categoryController = require('../controllers/categoryController.js'); 

const config = require('../config');

/////////////////////////////// Public Routes ////////////////////////////////////////// 

// Registration for new users: method = "post"
router.get('/categories',categoryController.getAllCategories); 

router.get('/category',categoryController.parseAllCategories);




///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;