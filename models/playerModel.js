var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var templatePlayerSchema = require('../schema/playerSchema.js'); 
var playerSchema = new Schema(templatePlayerSchema,{
    collection: 'player'
});

playerSchema.methods.getPlayer = async function(query){
    let filter = {};
    let data = await this.model('Player').find(query);
    let success = true;
    let msg = "";

    if(data.length == 0)    {   
        success = false;
        msg = "No data !";
    }

    filter.success = success;
    filter.msg = msg;
    filter.data = data;

    return filter;
}

playerSchema.methods.createPlayer = async function(query){
    let data = await query.save();
    let success = true;
    let msg = "game are created";

    let filter = {};

    if(data._id == "" || data._id == null)   {
        success = false;
        msg = "can't created..";
    }

    filter.success = success;
    filter.msg = msg;
    filter.data = "";

    return filter;
}

playerSchema.methods.ranking = async function(limit){
    let data = await this.model('Player').find(
        {'isWin':true},{'playerName':1,'action':1,'_id':0})
        .sort({'action.move':1}).limit(limit);
    let success = true;
    let msg = "";

    if(data == null || data =="")   {
        success = false;
        msg = "can't find player.."
    }

    return data;
}

module.exports = mongoose.model('Player', playerSchema);