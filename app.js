const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./model/product.js');

const crawler = require('./libs/crawlerAE.js');
const config = require('./config.js');

const AliExpressSpider = require('aliexpress');


let arr = ['https://ru.aliexpress.com/item/Xiaomi-Mi-A2-Lite-3/32915955141.html?spm=a2g0v.search0103.3.1.3274411a0qjHCS&transAbTest=ae803_4&ws_ab_test=searchweb0_0%2Csearchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536_10902%2Csearchweb201603_56%2CppcSwitch_0&algo_pvid=7789dafe-d67a-44e5-a78a-22654a05541a&algo_expid=7789dafe-d67a-44e5-a78a-22654a05541a-0',
    'https://ru.aliexpress.com/item/Xiaomi-Redmi-Note-7-4-64-Snapdragon-660-Octa-Core-4000/32967970775.html?spm=a2g0v.search0103.3.16.3274411a0qjHCS&transAbTest=ae803_4&ws_ab_test=searchweb0_0%2Csearchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536_10902%2Csearchweb201603_56%2CppcSwitch_0&algo_pvid=7789dafe-d67a-44e5-a78a-22654a05541a&algo_expid=7789dafe-d67a-44e5-a78a-22654a05541a-1',
    'https://ru.aliexpress.com/item/DOOGEE-Y8-3-GB-16-Android-9/32966714262.html?spm=a2g0v.search0103.3.25.3274411a0qjHCS&transAbTest=ae803_4&ws_ab_test=searchweb0_0%2Csearchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536_10902%2Csearchweb201603_56%2CppcSwitch_0&algo_pvid=7789dafe-d67a-44e5-a78a-22654a05541a&algo_expid=7789dafe-d67a-44e5-a78a-22654a05541a-2',
    'https://ru.aliexpress.com/item/Xiaomi-Redmi-6A-2/32900070611.html?spm=a2g0v.search0103.3.27.3274411a0qjHCS&transAbTest=ae803_4&ws_ab_test=searchweb0_0%2Csearchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536_10902%2Csearchweb201603_56%2CppcSwitch_0&algo_pvid=7789dafe-d67a-44e5-a78a-22654a05541a&algo_expid=7789dafe-d67a-44e5-a78a-22654a05541a-3',
    'https://ru.aliexpress.com/item/Xiaomi-Mi-A2-Lite-4-64-5-84/32899979013.html?spm=a2g0v.search0103.3.42.3274411a0qjHCS&transAbTest=ae803_4&ws_ab_test=searchweb0_0%2Csearchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536_10902%2Csearchweb201603_56%2CppcSwitch_0&algo_pvid=7789dafe-d67a-44e5-a78a-22654a05541a&algo_expid=7789dafe-d67a-44e5-a78a-22654a05541a-4',

];
crawler(arr);

Product.find({}, (err, products) => {
    if (err) {
        return res.status(500).send("There was a problem with searching posts in DB.")
    }
   console.log('All products in DB');
   console.log(products);
});

console.log('---------------------------------------------------------------------');

AliExpressSpider.Search({
  keyword: 'iPad',
  page: 2
}).then(function(d){
  
  

  console.log('d', d)
});








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