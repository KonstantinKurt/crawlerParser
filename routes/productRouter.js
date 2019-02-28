const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controllers/productController.js'); 

const config = require('../config');



// Parses one product by category
router.get('/products/:id',productController.parseByCategory); 
// Parses all products from AE by product category
router.get('/products',productController.parseAllProducts); 


// router.get('/product',productController.getAllProducts);

router.get('/update',productController.getProductsUpdate); 


router.get('/product/:id',productController.getProductHistory);

 

///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;