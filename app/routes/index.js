'use strict';

var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function (app) {
    var stockHandler = new StockHandler();

    app.route('/')
        .get(function (req, res) {
            res.render('index');
        });

    app.route('/api/stocks')
        .get(stockHandler.getStocks)
        .post(stockHandler.addStock)
        .delete(stockHandler.deleteStock);

    app.route('/api/stocks/:code')
        .get(stockHandler.getStockData);
};
