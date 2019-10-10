var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
var Token = require('../utils/token.js');

var router = express.Router();

// 获取验证码
router.post('/getcode', function(req, res, next) {
	var code = '000000' + parseInt(Math.random()*1000000).toString();
	code = code.slice(-6);
	// 向服务器的session容器中写入 code
	req.session.code = code;
	res.send({ status: 200, data: code, message: ""});
});
// 点击注册
router.post('/getregister', function(req, res, next) {
	var {name, phone, pwd, code } = req.body;
	var sql = 'INSERT `dt_user`(`name`, `phone`, `pwd`) VALUES (?,?,?);';
	if(req.session.code != code) {
		res.send({ status: 199, data: code, message: '验证码错误'});
		return;
	}
	res.myPromise = query(sql, [name, phone, pwd])
		.then(results => {
			// console.log(results);
			if(results.affectedRows === 1) {
				return httpResult.success();
			}
		});
	next();
});


module.exports = router;