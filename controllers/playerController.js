const playerModel = require('../models/playerModel');
const mongoose = require('mongoose');
const Player = mongoose.model('Player');
const player = new Player();

exports.getPlayerAll = function() {
    let filter = {};
    return player.getPlayer(filter);
}

exports.getPlayer = function(filter) {
    return player.getPlayer(filter);
}

exports.createPlayer = function (fieldID,playerName) {
    let usingTime = 0;
    let log = [];
    log.push({'selected':0,'action':0,'msg':'new game'});
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

exports.ranking = function(limit) {
    return player.ranking(limit);
}

exports.clearPlayer = function(query){
    return player.clearPlayer(query);
}

exports.updateAction = function(action,playerID){
    return player.updateAction(action,playerID);
}

exports.updateLog = function(log,playerID){
    return player.updateLog(log,playerID);
}