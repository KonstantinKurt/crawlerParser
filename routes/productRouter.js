const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controllers/productController.js'); 

const config = require('../config');




router.get('/products/:id',productController.parseByCategory); 
router.get('/products',productController.parseAllProducts); 


router.get('/product',productController.getAllProducts);
router.get('/product/:id',productController.getProductHistory);





///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;