var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var templateFieldSchema = require('../schema/fieldSchema.js'); 
var fieldSchema = new Schema(templateFieldSchema,{
    collection: 'field'
});

fieldSchema.methods.getField = async function(query)
{ 
    let filter = {};
    let data = await this.model('Field').find(query);
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

fieldSchema.methods.createField = async function(query){
    let res = await query.save();
    let success = true;
    let msg = "";
    let data = {};
    let filter = {};
    if(res._id == null || res._id == "")    
    {
        success = false;
        msg = "Can't create game ..";
    }
    data._id = res._id;
    filter.success = success;
    filter.msg = msg;
    filter.data = data;

    return filter;
}

fieldSchema.methods.clearField = async function(query){
    let res = await this.model('Field').deleteMany(query);
    let filter = {};
    let msg = "Deleted !";
    let success = true;
    let data = {};
    data.nDeleted = res.result.n;
    data.ok = res.result.ok;
    if(data.ok != 1)    {   
        msg = "Error, Can't delete data from field. Please check your query"; 
        success = false;
    }
    filter.success = success;
    filter.msg = msg;
    filter.data = data;

    return filter;
    
}

fieldSchema.methods.updateField = async function(arrField,fieldID){
    console.log(arrField);
    console.log(fieldID);
    let res = await this.model('Field').update({"_id":fieldID},{'field': arrField});
    console.log(res);
    return res;
}

fieldSchema.methods.updateShip = async function(ship,fieldID){
    return await this.model('Field').updateMany({"_id":fieldID},{'ship': ship});
}

module.exports = mongoose.model('Field', fieldSchema);