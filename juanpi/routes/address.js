var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
// var Token = require('../utils/token.js');

var router = express.Router();
// 新增地址
router.post('/add', function(req, res, next) {
	// var name = 'xiaoming';			//伪造的名字
	var name = req.token.name;
	var { receiveName, receiveTel, receiveAddress, receiveAddressDetail } = req.body;
	// console.log(receiveName, receiveTel, receiveAddress, receiveAddressDetail);
	var sql = 'INSERT `dt_address`(`name`,`receiveName`,`receiveTel`,`receiveAddress`,`receiveAddressDetail`,`isDefault`) VALUES (?,?,?,?,?,0);';
	res.myPromise = query(sql, [name, receiveName, receiveTel, receiveAddress, receiveAddressDetail])
		.then(results => {
			// console.log(results);
			return httpResult.success(results.insertId);
		});
	next();
});
// 将数据库中的收货地址展示出来
router.post('/list', function(req, res, next) {
	// var name = 'xiaoming';//伪造的人名
	var name = req.token.name;
	var sql = 'SELECT * FROM `dt_address` WHERE `name` = ?;';
	res.myPromise = query(sql, [ name ])
		.then(results => {
			// console.log(results);
			return httpResult.success(results);
		});
	next();
});
// 删除功能
router.post('/delete', function(req, res, next) {
	var id =parseInt(req.body.id);
	var sql = 'DELETE FROM `dt_address` WHERE `id` = ?;';
	res.myPromise = query(sql, [ id ])
		.then(results => {
			// console.log(results[0].id);
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '删除失败');
		});
	next();
});
// 修改地址
router.post('/update/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var { receiveName, receiveTel, receiveAddress, receiveAddressDetail} = req.body;
	var sql = 'UPDATE `dt_address` SET `receiveName` = ?,`receiveTel` = ?,`receiveAddress` = ?,`receiveAddressDetail` = ? WHERE `id` = ?;';
	res.myPromise = query(sql, [ receiveName, receiveTel, receiveAddress, receiveAddressDetail, id])
		.then(results => {
			// console.log(results);
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '修改失败');
		});
	next();
});
// 设置为 默认地址
router.post('/default', function(req, res, next) {
	var id = parseInt(req.body.id);
	// var name = 'xiaoming';			//伪造的名字
	var name = req.token.name;
	var sql = 'CALL p_setDefaultAddress(?,?);';
	res.myPromise = query(sql, [id, name])
		.then(results => {
			return httpResult.success();
		});
	next();
});
module.exports = router;