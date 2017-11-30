'use strict';

var axios = require('axios'),
    configAuth = require('../config/auth'),
    Stock = require('../models/stocks');

function StockHandler () {
    this.getStocks = function (req, res) {
        console.log('getStocks():');

        Stock
            .find()
            .exec(function (err, stocks) {
                if (err) { throw err; }

                console.log('getStocks: stocks = ', JSON.stringify(stocks));

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({result: 'OK', stocks: stocks});
            });
    };

    this.addStock = function (req, res, next) {
        console.log('addStock():');

        var newStock = new Stock({
            code: req.body.code
        });

        console.log('new stock to save: ', newStock);

        newStock.save(function (err, stock) {
            if (err) { throw err; }

            console.log('saved new stock: ', stock);

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({result: 'OK', stock: stock});
        });
    };

    this.deleteStock = function (req, res) {
        console.log('deleteStock():');

        Stock
            .findOne({'code': req.body.code})
            .remove()
            .exec(function (err, result) {
                if (err) { throw err; }

                res.setHeader('Content-Type', 'application/json');
                res.status(204).json({result: 'OK'});
            });

    };
}

module.exports = StockHandler;
