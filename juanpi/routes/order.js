var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var Token = require('../utils/token.js');

var router = express.Router();
router.post('/product', function(req, res, next) {
	var id = req.body.id;
	var name = req.token.name;
	var sql = 'SELECT * FROM `dt_products` WHERE `id`=?;';
	res.myPromise = query(sql, [id,name])
		.then(results => {
			// console.log(httpResult.success(results));
			return httpResult.success(results);
		});
	next();
});


module.exports = router;