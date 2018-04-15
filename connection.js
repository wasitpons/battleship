var mongoose = require('mongoose');

exports.connect = function(req, res){
    var db = mongoose.connect('mongodb://battleship:183461@ds223019.mlab.com:23019/battleship', {useMongoClient:true});
    mongoose.Promise = global.Promise;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('MongoDB Connected.');
    });
}