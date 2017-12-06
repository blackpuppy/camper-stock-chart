'use strict';

var axios = require('axios'),
    configAuth = require('../config/auth'),
    Stock = require('../models/stocks');

function StockHandler (io) {
    var composeStock = function (stock) {
        return {
            code: stock.code,
            name: stock.name,
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

        // read stock from database
        Stock
            .findOne({'code': req.body.code})
            .exec(function (err, stock) {
                if (err) {
                    throw err;
                }

                console.log('stock found = ', JSON.stringify(stock));

                if (stock) {
                    var stockData = {
                        code: stock.code,
                        name: stock.name,
                        desc: stock.desc
                    };

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({result: 'OK', stock: stockData});
                } else {
                    // TODO: query stock API to get stock description

                    var newStock = new Stock({
                        code: req.body.code,
                        name: req.body.code + ' fake name',
                        desc: req.body.code + ' fake description'
                    });

                    console.log('new stock to save: ', newStock);

                    newStock.save(function (err, stock) {
                        if (err) { throw err; }

                        console.log('saved new stock: ', stock);

                        var stockData = {
                            code: stock.code,
                            name: stock.name,
                            desc: stock.desc
                        };

                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json({result: 'OK', stock: stockData});

                        io.emit('stock-added', stock.code);
                    });
                }
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

                io.emit('stock-deleted', req.body.code);
            });
    };

    this.getStockData = function (req, res) {
    };
}

module.exports = StockHandler;
