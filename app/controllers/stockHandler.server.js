'use strict';

var axios = require('axios'),
    configAuth = require('../config/auth'),
    Stock = require('../models/stocks');

function StockHandler () {
    var composeStock = function (stock) {
        return {
            code: stock.code,
            desc: stock.desc
        };
    };

    this.getStocks = function (req, res) {
        console.log('getStocks():');

        Stock
            .find()
            .exec(function (err, stocks) {
                if (err) { throw err; }

                console.log('getStocks: stocks = ', JSON.stringify(stocks));

                var stocksData = stocks.map(composeStock);

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({result: 'OK', stocks: stocksData});
            });
    };

    this.addStock = function (req, res) {
        console.log('addStock():');

        // TODO: prevent duplicate stock
        // TODO: query stock API to get stock descrption

        var newStock = new Stock({
            code: req.body.code,
            desc: req.body.code + ' fake description'
        });

        console.log('new stock to save: ', newStock);

        newStock.save(function (err, stock) {
            if (err) { throw err; }

            console.log('saved new stock: ', stock);

            var stockData = {
                code: stock.code,
                desc: stock.desc
            };

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({result: 'OK', stock: stockData});
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

    this.getStockData = function (req, res) {
    };
}

module.exports = StockHandler;
