var redis 		= require('redis');
var allConfig = require('../../../config/env/all');
var redisClient = redis.createClient(allConfig.redis_db,{});

redisClient.on('error', function (err) {
    console.error('Error ' + err);
});

redisClient.on('connect', function (err) {
	if(err) {
		console.log('Error connecting redis to: ' + allConfig.redis_db + '. ' + err);
	} else {
		console.log('Succeeded connected redis to: ' + allConfig.redis_db);
		console.log('Redis is ready');
	}
    
});

exports.redis = redis;
exports.redisClient = redisClient;