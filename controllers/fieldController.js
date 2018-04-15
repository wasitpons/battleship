const fieldModel = require('../models/fieldModel');
const mongoose = require('mongoose');
var Field = mongoose.model('Field');

exports.getFieldAll = function()
{
    let field = new Field()
    let filter = {};
    return field.getFieldAll(filter);;
}