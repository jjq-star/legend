var express = require('express');
// var mysql = require('mysql');
var httpResult = require('../config');
var query = require('../utils/dbHelper.js');
var router = express.Router();

// router.get('/list', function(req, res, next) {
// 	var mId = parseInt(req.query.mId) ;
// 	
// 	// 连接数据库
// 	var connection = mysql.createConnection({
// 		host: 'localhost',
// 		database: 'juanpi',
// 		user: 'root',
// 		password: '0912'
// 	});
// // sql语句查询
// 	var sql = 'SELECT * FROM `dt_category` WHERE `fid` = ?;';
// 	// query 方法
// 	connection.query(sql, [ mId ], function(err, results, fields) {
// 		// 关闭连接
// 		connection.end();
// 		// 判断
// 		if(err) {
// 			res.send({ status: 500, data: null, message: err.message});
// 			return;
// 		}
// 		res.send({ status: 200, data: results, message: ''});
// 	});
// });
// 封装
router.get('/list/:mId', function(req, res, next) {
	// 从 get 请求中获取 mId
	// var mId = parseInt(req.query.mId) ;
	var mId = parseInt(req.params.mId) ;
	// sql语句查询
	var sql = 'SELECT * FROM `dt_category` WHERE `fid` = ?;';
	res.myPromise = query(sql,[mId] ).then(function(data) {
		return httpResult.success(data);
	});
	next();
});


module.exports = router;