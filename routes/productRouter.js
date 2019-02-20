const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controllers/productController.js'); 

const config = require('../config');




router.get('/products/:id',productController.getByCategory); 






///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;