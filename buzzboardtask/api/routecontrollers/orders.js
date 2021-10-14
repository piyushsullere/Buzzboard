const request = require('request');
const mongoose = require('mongoose');
const Order = require('../controllers/orders.js');
const genRes = require('../controllers/genres.js');


/** find order list by Object id (order_id == ObjectId) */
exports.getOrderByObjectId = async (req, res) => {
	const id = req.query._id ? req.query._id : '';
	if(id  == ''){
		return res.send(genRes.generateResponse(false, "Object Id is require parameter", 400, null));
	}
	let orderObject = await Order.getOrderByObjectId(id);
	orderObject = JSON.parse(orderObject);
	if (orderObject.status) {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	} else {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	}
}

/* find order list by delivery_date*/
exports.getOrderListByDate = async (req, res) => {
	const delivery_date = req.query.delivery_date ? req.query.delivery_date : '';
	if(delivery_date  == ''){
		return res.send(genRes.generateResponse(false, "delivery_date is require parameter", 400, null));
	}
	let orderObject = await Order.getOrderListByDate(delivery_date);
	orderObject = JSON.parse(orderObject);
	if (orderObject.status) {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	} else {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	}
}

/* create order in database */
exports.addOrder = async (req,res) => {
	var order = req.body.order;
	let orderObject = await Order.create(order);
	orderObject = JSON.parse(orderObject);
	if (orderObject.status) {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	} else {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	}
}

/* update order by Object id (order_id == ObjectId) */
exports.updateOrderByObjectId = async (req, res ) => {
	var order = req.body.order;
	let orderObject = await Order.update(order._id, order);
	orderObject = JSON.parse(orderObject);
	if (orderObject.status) {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	} else {
		return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
	}
}

/* remove order by Object id (order_id == ObjectId)  */
exports.removeOrderByObjectId = async (req,res) => {
	var order_id = req.body.order;
	let orderObject = await Order.remove(order_id);
	orderObject = JSON.parse(orderObject);
		if (orderObject.status) {
			return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
		} else {
			return res.send(genRes.generateResponse(orderObject.status, orderObject.message, orderObject.code, orderObject.data));
		}
	}

