async function updateDB() {
    Product.find({}, (err, products) => {
        err && res.status(404).send("There was a problem with searching categories in DB.");
        for (let i = 0; i < products.length; i++) {
            crawlerData.productQueryArray.push(`https://www.pricearchive.org/aliexpress.com/item/${products[i].refference.split("/")[5].substring(0,11)}`);
        };
        parsers.getProductInfo.queue(crawlerData.productQueryArray);
    });
    //console.log(`doing something`);
};


module.exports = {
    updateDB: updateDB,
};