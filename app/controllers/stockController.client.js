'use strict';

(function () {
    var stocksEle = document.querySelector('.stocks') || null,
        addButton = document.querySelector('.btn-add'),
        stocksUrl = appUrl + '/api/stocks';

    var showNewStock = function (stock) {
        console.log('showNewStock(): stock = ', stock);

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

            var newStock = JSON.parse(result);

            showNewStock(newStock.stock);
        }, JSON.stringify(data));
    };

    addButton.addEventListener('click', addStock, false);

    // read stock codes

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
})();
