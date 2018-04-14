var mongoose = require('mongoose');

exports.connect = function(req, res){
    var db = mongoose.connect('mongodb://dscanon:dscanon@ds157833.mlab.com:57833/hostel', {useMongoClient:true});
    mongoose.Promise = global.Promise;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('MongoDB Connected.');
    });
}