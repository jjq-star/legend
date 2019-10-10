var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var router = express.Router();

router.post('/products', function(req, res, next) {
	// es6 解构
	var {cid, start, count, orderDir, orderCol} = req.body;
	var sql = 'SELECT * FROM `dt_products` WHERE `cid` = ? ORDER BY ' +
				`${ orderCol } ${ orderDir }`+
					' LIMIT ?,?; ';
	var params = [parseInt(cid), parseInt(start), parseInt(count)];
	res.myPromise = query(sql, params).then(httpResult.success);
	next();
});

router.get('/detail/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'SELECT * FROM `dt_products` WHERE `id` = ?;';
	res.myPromise = query(sql, [ id ])
		.then(results => {
			return httpResult.success(results[0]);
		});
	next();
});




module.exports = router;