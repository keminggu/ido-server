var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema   = new Schema({
	uId: { type: Schema.Types.ObjectId, ref: 'User'},  //外键
    title: { type: String, required: true},
    address: { type: String, required: true},
    location: {
    	type: {
	      type: String,
	      required: true,
	      enum: ['Point', 'LineString', 'Polygon'],
	      default: 'Point'
	    },
    	coordinates: [Number],
    },
    content: { type: String, required: true},
    create_at : {type : Date, default: Date.now()},
    //0: 删除  1:xxx
    status: {type:Number, required: true, default: 1}
});

//对坐标建索引
MessageSchema.index({location: '2dsphere'});


MessageSchema.statics.findNear = function(location, func) {
	this.geoNear({type: "Point", coordinates: [location.longitude, location.latitude]}, {
		spherical: true, 
		maxDistance: 50 / 6378.137, 
		distanceMultiplier: 6378.137,
		num: 50
	}, func);
}

module.exports = mongoose.model('Message', MessageSchema);