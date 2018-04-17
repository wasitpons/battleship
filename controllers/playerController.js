const playerModel = require('../models/playerModel');
const mongoose = require('mongoose');
const Player = mongoose.model('Player');
const player = new Player();

exports.getPlayerAll = () => {
    let filter = {};
    return player.getPlayer(filter);
}

exports.getPlayer = (filter) => {
    return player.getPlayer(filter);
}

exports.createPlayer = (fieldID,playerName) => {
    let usingTime = 0;
    let log = [];
    let action = {};
    action.miss = 0;
    action.hit = 0;
    action.move = 0;

    let filter = {};
    filter.playerName = playerName;
    filter.fieldID = fieldID;
    filter.usingTime = usingTime;
    filter.log = log;
    filter.action = action;
    filter.isWin = false;

    let query = new Player(filter);
    return player.createPlayer(query);

}

exports.ranking = (limit) => {
    return player.ranking(limit);
}