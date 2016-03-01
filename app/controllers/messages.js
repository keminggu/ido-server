var express  = require('express');
var router 	 = express.Router();

var Message     = require('./../models/message');
var tokenManager = require('./../models/except/token-manager');

var logger = require("./../../logHelper").helper; 

router.post('/publish',function(req, res, next){
	var uId = req.body.uId || '';
	var title = req.body.title || '';
    var address = req.body.address || '';
    var location = req.body.location;
    var content = req.body.content || '';

 	console.log(req.body);
    if (uId == '' || title == '' || address == '' || content == '') {
        return res.json({
        	type: false,
        	msg: "param is empty"
        });
    }
     //save message model
    var messageModel = new Message({
    	uId: uId,
    	title: title,
    	address: address,
    	location: {
	      "type": "Point",
	      "coordinates": [location.longitude, location.latitude]
	    },
    	content: content,
    });

	messageModel.save(function(err, message){

		if(err) {
			console.log("save message err:" + err);
			res.json({
				type: false,
				msg: "save message fail",
			});
		} else {
			res.json({
	            type: true
		    });
		}		
	});
});


router.get('/',function(req, res, next){
	var longitude = parseFloat(req.query.longitude);
	var latitude = parseFloat(req.query.latitude);

	if (isNaN(longitude) || isNaN(latitude)) {
		res.json({
			type: false,
			msg: 'param is err'
		});
		return;
	}

	Message.findNear({ longitude: longitude, latitude: latitude}, function(err, results, stats){
		if(err) {
			console.log("findNear err" + JSON.stringify(err));
		}
		console.log("findNear succ " + JSON.stringify(results));
		Message.find({status: 1}, {__v: 0},function(err, messages){
			if (err) {
				console.log('query message fail');
				res.json({
					type: false,
					msg: err,
				});
			} else {
				logger.info(messages);
				res.json({
					type: true,
					data: messages,
				});
			}
		});
	});
	
});

module.exports = router;