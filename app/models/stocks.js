'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    id: String,
    users: [String]
});

module.exports = mongoose.model('Stock', Stock);
