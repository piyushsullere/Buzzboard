var mongoose 		= require('mongoose');
var Schema 			= mongoose.Schema;
var ObjectId 		= Schema.ObjectId;

var OrderSchema 	= new Schema({
	item_name : {type : String},
	cost : {type : String},
	order_date:  {type : String, required: true},
	delivery_date :  {type : String, required: true}   
});

module.exports = mongoose.model('order', OrderSchema);