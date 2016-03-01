var mongoose    = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema   = new Schema({
	//发布者
	user: { 
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	//主题
    topic: { 
    	type: String, 
    	required: true
    },
    //内容
    content: {
    	type: String, 
    	required: true
    },
    //任务时间
    time: {
    	type: Date,
    	default: Date.now() 
    },
    //联系人（电话）
    contact: Number,
    //地点
    address: { 
    	type: String, 
    	required: true
    },
    location: {
    	type: {
	      type: String,
	      required: true,
	      enum: ['Point', 'LineString', 'Polygon'],
	      default: 'Point'
	    },
    	coordinates: [Number],
    },
  
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        default: 1,
    }
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