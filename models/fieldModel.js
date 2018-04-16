var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var templateFieldSchema = require('../schema/fieldSchema.js'); 
var fieldSchema = new Schema(templateFieldSchema,{
    collection: 'field'
});

fieldSchema.methods.getFieldAll = async function(filter)
{ 
    return await this.model('Field').find(filter);
}

module.exports = mongoose.model('Field', fieldSchema);