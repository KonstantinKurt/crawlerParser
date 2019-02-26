const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productController = require('../controllers/productController.js'); 

const config = require('../config');




router.get('/products/:id',productController.parseByCategory); 
router.get('/products',productController.parseAllProducts); 


router.get('/product',productController.getAllProducts);

router.get('/productsInfo',productController.getProductInfo); 

router.get('/product/:id',productController.getProductHistory);

 





 // router.get('/getProductsForDebug',productController.getProductsForDebug);


// router.get('/productsHistory',productController.getProductsHistory);


// router.get('/refferences',productController.getRefferences);
// router.get('/productsInfo',productController.getProductsFullInfo);


///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;