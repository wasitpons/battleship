const fieldModel = require('../models/fieldModel');
const mongoose = require('mongoose');
const Field = mongoose.model('Field');
const field = new Field();

exports.getFieldAll = () => {
    let data = {};
    return field.getField(data);
}

exports.getField = (data) => {
    return field.getField(data);
}

exports.createField = () => {
    let currentDate = new Date();
    let status = "defender";
    let ship = {};
    ship.battleShip = 0;
    ship.cruisers = 0;
    ship.destroyer = 0;
    ship.subMarines = 0;
    let arr1 = [];
    let arr2 = [];

    for(var i=0; i<10; i++) {
        arr2 = [];
        for(var j=0; j<10; j++) {
            arr2.push(0);
        }
        arr1.push(arr2);
    }
    let filter = {};
    filter.datetime = currentDate.toISOString();
    filter.status = status;
    filter.ship = ship;
    filter.field = arr1;

    let query = new Field(filter);
    return field.createField(query);
}