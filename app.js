const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Crawler = require('crawler');
const cheerio = require('cheerio');
const logger = require('morgan');
const Sequelize = require('sequelize');
const cron = require('node-cron');

const Product = require('./model/product.js');
const crawler = require('./libs/crawlerAE.js');
const config = require('./config.js');
const parsers = require('./libs/parsers.js');
const updateDB = require('./libs/cron.js');

const AliExpressSpider = require('aliexpress');

const categoryRouter = require('./routes/categoryRouter.js');
const productRouter = require('./routes/productRouter.js');
const userRouter = require('./routes/userRouter.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', categoryRouter);
app.use('/', productRouter);
app.use('/', userRouter);








cron.schedule('* * * * Wednesday', () => {
    updateDB().then(() => {
        console.log('DataBase updated succsesfully!(1 hour cron)');
    });
});
app.get('/', (req, res) => {
    res.send('Crawler Parser');

});
// const sequelize = new Sequelize('AEdb', 'cubex', 'cubex', {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .then(() => {
//         app.listen(config.PORT, () => {
//             console.log(`Express запущен на http://localhost:'  ${config.PORT}  '; нажмите Ctrl+C для завершения.`);
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });



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

