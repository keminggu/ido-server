var routes = require('../app/controllers/index');
var users = require('../app/controllers/users');
var messages = require('../app/controllers/messages');

module.exports = function(app) {
	app.use('/', routes);
	
	app.use('/users', users);

	app.use('/messages', users);
}
