var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');

var router = express.Router();

router.post('/phone', function(req, res, next) {
	var name = req.token.name;
	var sql = 'SELECT * FROM `dt_user` WHERE `name` = ?;';
	res.myPromise = query(sql, [name])
		.then(results => {
			// console.log(results);
			return httpResult.success(results[0].phone);
		});
	next();
});
router.post('/exit', function(req, res, next) {
	var name = req.token.name;
	var sql = 'SELECT * FROM `dt_user` WHERE `name` = ?;';
	// res.send(httpResult.success());
	res.myPromise = query(sql, [name])
		.then(results => {
			// console.log(results);
			return httpResult.success();
		});
	next();
});
module.exports = router;