'use strict';
const Order = require('../models/orders.js');
const genRes 	= require('./genres.js');
const _ 		= require('lodash');
const mongoose = require('mongoose');

exports.create = async (params) => {
	try {
		const order = new Order(params);
		const result = await order.save();
		return genRes.generateResponse(true,"Order created successfully",200, result);
	} catch (error) {
		return genRes.generateResponse(false,"there occurred some error : "+error, 400, null);
	}
}

exports.getOrderByObjectId = async (params) => {
	try {
		const result = await Order.find({_id : params}).exec();
		if(result && result!='null' && result!='undefined') {
			return genRes.generateResponse(true,"Order found successfully",200, result);
		} else {
			return genRes.generateResponse(false,"Order not found" ,400, null);
		}
		
	} catch(error) {
		return genRes.generateResponse(false,"there occurred some error : "+error, 400, null);
	}
}

exports.getOrderListByDate = async (params) => {
	try {
		const result = await Order.find( {'delivery_date': params} ).exec();
		if(result && result!='null' && result!='undefined') {
			return genRes.generateResponse(true,"Order found successfully",200, result);
		} else {
			return genRes.generateResponse(false,"Order not found" ,400, null);
		}
		
	} catch(error) {
		return genRes.generateResponse(false,"there occurred some error : "+error, 400, null);
	}
}

exports.update = async (id, params) => {
	try {
		params = _.omit(params, ['id', "$$hashKey"]);
		const result = await Order.findByIdAndUpdate(id, params);
		return genRes.generateResponse(true,"Order update successfully",200, null);
	} catch (error) {
		return genRes.generateResponse(false,"there occurred some error : "+error, 400, null);
	}
}


exports.remove = async (id) => {
	try {
		const result = await Order.findByIdAndRemove(id);
		return genRes.generateResponse(true,"Order Remove successfully",200, null);
	} catch (error) {
		return genRes.generateResponse(false,"there occurred some error : "+error, 400, null);
	}
}
	
