var fs = require('fs');
var allConfig = require('../../../config/env/all');
var mongoose   = require("mongoose");

mongoose.connect(allConfig.mongo_db);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

mongoose.connection.on('open', function() {
  console.info('MongoDB is ready');
});

mongoose.connection.on('close', function() {
  console.info('MongoDB is close');
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