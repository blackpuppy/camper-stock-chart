'use strict';

var path = process.cwd(),
    StockHandler = require(path + '/app/controllers/stockHandler.server.js'),
    socketIO = require('socket.io');

module.exports = function (server, app) {
    var io = socketIO(server),
        stockHandler = new StockHandler(io);

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

    io.on('connection', function (socket) {
        console.log('Client connected');
        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    });
    // setInterval(function () {
    //     io.emit('time', new Date().toTimeString());
    // }, 1000);
};
