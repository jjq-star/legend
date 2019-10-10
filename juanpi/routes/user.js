var express = require('express');
// var mysql = require('mysql');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
var Token = require('../utils/token.js');


var router = express.Router();

// 密码登录 封装
router.post('/login/pwd', function(req, res, next) {
	var { name, pwd } = req.body;
	var sql = 'SELECT count(*) AS count FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
	res.myPromise = query(sql, [ name, pwd])
		.then(results => {
			console.log(results);
			if(results[0].count > 0) {
				return httpResult.success(Token.generate({ name: name }));
			} else{
				return httpResult.failure(null, '用户名或密码错误');
			}
		});
	next();
})
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
	var connection = mysql.createConnection({
		host: 'localhost',
		database: 'juanpi',
		user: 'root',
		password: '0912'
	});
	var sql = 'SELECT count (*) AS count FROM `dt_user` WHERE `phone` = ?;';
	// query 方法
	connection.query(sql, [ phone ], function(err, results, fields) {
		connection.end();
		if(err) {
			res.send({ status: 500, data: null, message: err.message});
			return;
		}
		if(results[0].count === 1) {
			req.session.phone = phone;
			res.send({ status: 200, data: null, message: '登陆成功'});
		} else {
			res.send({ status: 199, data: null, message: '手机号未注册'});
		}
			
	});
	
	
});
module.exports = router;