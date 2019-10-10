var express = require('express');
var mysql = require('mysql');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
var Token = require('../utils/token.js');


var router = express.Router();
// 密码登录
// router.post('/login/pwd', function(req, res, next) {
// 	// 从 post 请求中解析出用户名和密码
// 	var personal = req.body.personal;
// 	var pwd = req.body.pwd;
// 	
// 	// 连接数据库
// 	var connection = mysql.createConnection({
// 		host: 'localhost',
// 		database: 'juanpi',
// 		user: 'root',
// 		password: '0912'
// 	});
// 	// sql 语句查询 
// 	var sql = ' SELECT count (*) AS count FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
// 	// query 方法
// 	connection.query(sql, [personal, pwd], function(err, results, fields) {
// 		// 关闭连接
// 		connection.end();
// 		if(err) {
// 			res.send({status: 500, data: null, message: err.message});
// 			return;
// 		}
// 		console.log(results);
// 		if(results[0].count === 1){
// 			res.send({status: 200, data: null, message: ''});
// 		} else {
// 			res.send({status: 199, data: null, message: '用户名或密码错误'});
// 		}
// 	});
// });
// 密码登录 封装
router.post('/login/pwd', function(req, res, next) {
	var { name, pwd } = req.body;
	var sql = 'SELECT `phone` FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
	res.myPromise = query(sql, [ name, pwd])
		.then(results => {
			if(results[0]) {
				return httpResult.success(Token.generate({ name: results[0].phone }));
			} else{
				return httpResult.failure(null, '用户名或密码错误');
			}
		});
	next();
});
// 验证码
router.get('/login/code', function(req, res, next){
	var code = '000000' + parseInt(Math.random()*1000000).toString();
	// console.log(code.slice(-6));
	code = code.slice(-6);
	// $('.input-code>span.code').text(code.slice(-6));
	// 向服务器的session容器中写入 code
	req.session.code = code;
	res.send({ status: 200, data: code,message: ""});
});
// 手机登录
router.post('/login/phone',function(req, res, next) {
	var phone = req.body.phone;
	var code = req.body.code;
	if(req.session.code !== code){
		res.send({ status: 199, data: code, message: '验证码错误'});
		return;
	};
	var sql = 'SELECT `phone` FROM `dt_user` WHERE `phone` = ?;';
	// query 方法
	res.myPromise = query(sql,[phone])
		.then(results => {
			if(results[0]) {
				var name = results[0].phone;
				return httpResult.success(Token.generate({ name: name }));
			} else {
				return httpResult.failure(null, '手机号未注册');
			}
		});
	next();
});

//后台管理系统  登录
router.post('/login/admin', function(req, res, next) {
	var { name, pwd } = req.body;
	var sql = 'SELECT count(*) AS count FROM `dt_admin` WHERE `name` = ? AND `pwd` = ?;';
	res.myPromise = query(sql, [ name, pwd])
		.then(results => {
			if(results[0].count > 0) {
				return httpResult.success(Token.generate({ name: name }));
			} else{
				return httpResult.failure(null, '用户名或密码错误');
			}
		});
	next();
});
//修改密码
router.post('/changepwd',Token.check, function(req,res,next) {
	var name = req.token.name;
	var { oldPwd, newPwd } = req.body;
	var sql = 'CALL p_password(?,?,?);';
	res.myPromise = query(sql, [name, oldPwd, newPwd ])
		.then(results => {
			if(results[0][0].result === '') {
				return httpResult.success(null,'新密码修改成功');
			} else {
				return httpResult.failure(null, '原始密码错误');
			}
		});
	next();
});

module.exports = router;