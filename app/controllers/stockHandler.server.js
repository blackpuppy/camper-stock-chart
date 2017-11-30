'use strict';

var axios = require('axios'),
    configAuth = require('../config/auth'),
    Stock = require('../models/stocks');

function StockHandler () {
    this.getStocks = function (req, res) {
        console.log('getStocks():');

        if (err) { throw err; }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({result: 'OK', stocks: stocks});
    };

    this.addStock = function (req, res) {
        console.log('addStock():');

        if (err) { throw err; }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({result: 'OK'});
    };

    this.deleteStock = function (req, res) {
        console.log('deleteStock():');

        if (err) { throw err; }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({result: 'OK'});
    };
}

module.exports = StockHandler;
