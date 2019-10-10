var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
var Token = require('../utils/token.js');

var router = express.Router();
// 加入购物车
router.post('/addproduct', function(req, res, next) {
	var pid = parseInt(req.body.pid);
	var count = parseInt(req.body.count);
	var size = req.body.size;
	var name = req.token.name;
	var sql = 'CALL p_addProductToCart(?,?,?,?,?);';
	res.myPromise = query(sql, [ name, pid, count, size, new Date() ])
		.then(results => {
			console.log(results);
			return httpResult.success(results[0][0].result);
		});
	next();
});
// 获取商品数量，并在购物车中显示
router.get('/getcount', function(req, res, next) {
	// var name = 'xiaoming';
	var name = req.token.name;
	var sql = 'SELECT sum(`count`) as count FROM `dt_cart` WHERE `name` = ?;';
	res.myPromise = query(sql, [ name ])
		.then(results => {
			return httpResult.success(results[0].count);
			console.log(results[0].count);
		});
	next();
});
router.post('/list', function(req, res, next) {
	var name = req.token.name;
	console.log(name);
	var sql = 'CALL p_getCartInfo(?);';
	res.myPromise = query(sql, [ name ])
		.then(results => {
			console.log(results);
			return httpResult.success(results[0]);
		});
	next();
});
// 减少商品数量
router.get('/decrease/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'UPDATE `dt_cart` SET `count` = `count` - 1 WHERE `id` = ?;';
	res.myPromise = query(sql, [ id ])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '失败');
		});
	next();
});
// 增加商品数量
router.get('/increase/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'UPDATE `dt_cart` SET `count` = `count` + 1 WHERE `id` = ?;';
	res.myPromise = query(sql, [ id ])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '失败');
		});
	next();
});
// 删除商品
router.post('/delete', function(req, res, next) {
	var deleteId = JSON.parse(req.body.deleteId);
	console.log(deleteId);
	var sql = 'DELETE FROM `dt_cart` WHERE `id` IN (?);';
	res.myPromise = query(sql, [ deleteId ])
		.then(results => {
			if(results.affectedRows === deleteId.length) {
				return httpResult.success();
			} else {
				return httpResult.failure(null, '删除失败');
			}
		});
	next();
});
// 结算
router.post('/settlement', function(req, res, next) {
	var settlementId = JSON.parse(req.body.settlementId).join(',');
	var account = parseFloat(req.body.account);
	var size = req.body.size;
	// var name = 'xiaoming';					//伪造的名字
	var name = req.token.name;
	var sql = 'CALL p_settlement(?,?,?,?,?);';
	res.myPromise = query(sql, [settlementId, account, size, new Date(), name])
		.then(results => {
			return httpResult.success();
		});
	next();
});

module.exports = router;