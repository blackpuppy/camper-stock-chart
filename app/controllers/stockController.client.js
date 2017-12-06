'use strict';

(function () {
    var stocksEle = document.querySelector('.stocks') || null,
        addButton = document.querySelector('.btn-add'),
        stocksUrl = appUrl + '/api/stocks';

    var showStock = function (stock) {
        console.log('showStock(): stock = ', stock);

        var template = document.querySelector('.new-stock') || null;

        if (!!template) {
            var stockFragment = template.cloneNode(true),
                title = stockFragment.querySelector('h3'),
                desc = stockFragment.querySelector('span');
            stockFragment.classList.remove('hidden');
            title.innerHTML = stock.code;
            desc.innerHTML = stock.desc || '';
            stocksEle.appendChild(stockFragment);
        }
    };

    var plotStock = function (stock) {
        console.log('plotStock(): stock = ', stock);
    };

    var addStock = function (e) {
        e.preventDefault();

        var stockCodeEle = document.querySelector('.stock-code') || null;
        if (!stockCodeEle) {
            return;
        }

        var stockCode = stockCodeEle.value,
            data = {
                code: stockCode
            };

        ajaxFunctions.ajaxRequest('POST', stocksUrl, function (result) {
            console.log('POST ', stocksUrl, ' success: result = ', result);

            stockCodeEle.value = '';

            var newStock = JSON.parse(result);

            showStock(newStock.stock);
        }, JSON.stringify(data));
    };

    var getStocks = function() {
        ajaxFunctions.ajaxRequest('GET', stocksUrl, function (result) {
            console.log('GET ', stocksUrl, ' success: result = ', result);

            var stocks = JSON.parse(result);

            console.log('  stocks = ', stocks);

            for (var i = 0; i < stocks.stocks.length; i++) {
                showStock(stocks.stocks[i]);
            }
        });
    };

    addButton.addEventListener('click', addStock, false);

    // read stock codes
    getStocks();

    // Your First Charts
    var myChart = Highcharts.StockChart('chart', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });

    var socket = io();
    var el = document.getElementById('server-time');

    socket.on('time', function(timeString) {
        el.innerHTML = 'Server time: ' + timeString;
    });
})();
