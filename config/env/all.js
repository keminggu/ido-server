var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	http: {
    	port: process.env.PORT || 3000
    },
	mongo_db: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ido',
	redis_db: process.env.REDIS_URI || 'redis://127.0.0.1:6379',
	jwt_secret: process.env.JWT_SECRET || 'jwt_secret',
	token_exp: 60 * 60,
};