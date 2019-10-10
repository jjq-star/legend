var express = require('express');
var httpResult = require('../config');
var query = require('../utils/dbHelper.js');

var upload = require('../utils/upload.js');
var file = require('../utils/file.js');
var assetsPath = require('../config/assetsPath.js');
var path = require('path');

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

//  后台管理系统

//处理图片预上传请求
router.post('/upload',upload.single('avatar'),function(req,res,next){
    res.send(httpResult.success(req.file.filename));
});

// 新增分类
router.post('/add', function(req, res, next) {
    var { fid, name, avatar } = req.body;
    var { tmp, root, category } = assetsPath;
    var fromPath = path.join(tmp, avatar);
    var toPath = path.join(root, category, avatar);
    res.myPromise = file.copy(fromPath, toPath)                 // 从tmp中拷贝到最终目录中
        .then(() => file.unlink(fromPath))      // 从temp中删除临时文件
        .then(() => query('CALL p_addCategory(?,?,?);', [ fid, name, category + avatar ]))
        .then(results => results[0][0].result)
        .then(data => httpResult.success(data, '新增成功'))
        .catch(message => httpResult.error(null, message));
    next();
});
// 删除分类
router.post('/remove', function(req, res, next) {
    var id = parseInt(req.body.id);
    var avatar = req.body.avatar; // '/images/category/'
    res.myPromise = query('CALL p_removeCategory(?);', [ id ])
        .then(results => results[0][0].result)
        .then(results => {
            if(results === '') {
                // 删除分类对应的图片
                return file.unlink(path.join(assetsPath.root, avatar))
                    .then(() => httpResult.success(null, '删除成功'))
                    .catch(err => httpResult.failure(null, err.message));
            }
            else 
                return httpResult.failure(null, results)
        })
        .catch(message => httpResult.error(null, message));
    next();
});
// 修改分类
router.post('/update', function(req, res, next) {
    var { id, fid, name, avatar, oldAvatar } = req.body;
    res.myPromise = new Promise(function(resolve, reject) {
        if(avatar !== '') { // 如果修改了图片
            var { tmp, root, category } = assetsPath;
            var fromPath = path.join(tmp, avatar);
            var toPath = path.join(root, category, avatar);
            file.copy(fromPath, toPath)
                .then(() => file.unlink(fromPath))
                .then(() => file.unlink(path.join(root, oldAvatar)))
                .then(() => resolve());
        }
        else resolve();
    })
        .then(() => {
            avatar = avatar !== '' ? (assetsPath.category + avatar) : oldAvatar;
            let sqlStr = 'UPDATE `dt_category` SET `fid` = ?,`name` = ?,`avatar` = ? WHERE `id` = ?';
            return query(sqlStr, [ fid, name, avatar, id ]);
        })
        .then(() => httpResult.success(null, '修改成功'))
        .catch(message => httpResult.error(null, message));
    next();
});



module.exports = router;