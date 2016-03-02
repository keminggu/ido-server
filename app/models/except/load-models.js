var fs = require('fs');
var allConfig = require('../../../config/env/all');
var mongoose   = require("mongoose");

// Find the appropriate database to connect to, default to localhost if not found.
var connect = function() {
  mongoose.connect(allConfig.mongo_db, function(err, res) {
    if(err) {
      console.log('Error connecting mongo to: ' + allConfig.mongo_db + '. ' + err);
    } else {
      console.log('Succeeded connected mongo to: ' + allConfig.mongo_db);
    }
  });
};
connect();

mongoose.connection.on('open', function() {
  console.info('MongoDB is ready');
});

mongoose.connection.on('disconnected', connect);

mongoose.connection.on('error', function(err) {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
  console.log(err);
});



// models loading
var models_path = allConfig.root + '/app/models';
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          console.log(newPath);
          require(newPath)
        }
      }
      // else if (stat.isDirectory()) {
      //   walk(newPath)
      // }
    })
}
walk(models_path)