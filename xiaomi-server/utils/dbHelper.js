// 连接数据库,执行指定的 sql 语句,并得到结果,得到结果后调用指定的回调函数
var mysql = require("mysql");

// query 返回一个 promise 对象
var query = (sql, params) => {
	var connection = mysql.createConnection({
		host:"localhost",
		database:"xiaomi",
		user:"root",
		password:"0912"
	});
	return new Promise((resolve, reject) => {
		connection.query(sql, params, (err, results, fields) => {
			connection.end();
			if(err) {
				console.log(err.message);
				reject(err);
			} else {
				resolve(results);
			}
			
		});
	});
};
module.exports = query;