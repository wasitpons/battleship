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
module.exports = mongoose.model('Field', fieldSchema);