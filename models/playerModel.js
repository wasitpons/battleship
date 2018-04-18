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

playerSchema.methods.clearPlayer = async function(query){
    let res = await this.model('Player').deleteMany(query);
    let filter = {};
    let msg = "Deleted !";
    let success = true;
    let data = {};
    data.nDeleted = res.result.n;
    data.ok = res.result.ok;
    
    if(data.ok != 1)    {   
        msg = "Error, Can't delete data from player. Please check your query"; 
        success = false;
    }
    filter.success = success;
    filter.msg = msg;
    filter.data = data;

    return filter;
}

playerSchema.methods.updateAction = async function(action,playerID){
    return await this.model('Player').update({"_id":playerID},{'action': action});
}
playerSchema.methods.updateLog = async function(log,playerID){
    return await this.model('Player').update({"_id":playerID},{'log': log});
}
module.exports = mongoose.model('Player', playerSchema);