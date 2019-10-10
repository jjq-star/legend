/* 
* @Author: liwenqi
* @Date:   2019-08-01 11:49:23
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-09-12 13:39:33
*/

'use strict';
var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var Token = require('../utils/token.js');
var path = require('path');
var upload = require('../utils/upload.js');
var assetsPath = require('../config/assetsPath.js');
var file = require('../utils/file.js');


var router = express.Router();

router.post('/list', function(req, res, next) {
    var { cid, name, start, count, orderCol, orderDir } = req.body;
    var sql = 
        "SELECT * FROM `dt_product` WHERE `cid` = ? AND `name` LIKE '%" + name + "%' ORDER BY " + 
        `${ orderCol } ${ orderDir }`+
        " LIMIT ?,?;";
    var params = [parseInt(cid), parseInt(start), parseInt(count)];
    res.myPromise = query(sql, params).then(httpResult.success);
    next();
});

router.get('/model/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'SELECT * FROM `dt_product` WHERE `id` = ?;';
    res.myPromise = query(sql, [ id ]).then(results => httpResult.success(results[0]));
    next();
});

//后台管理系统
router.post('/admin-list', function(req, res, next) {
    var { name, mId, sId, begin, pageSize } = req.body;
    res.myPromise = query('CALL p_getProductByCondition(?,?,?,?,?);', [ name, mId, sId, begin, pageSize ])
            .then(results => httpResult.success({ total: results[0][0].total, list: results[1] }))
            .catch(message => httpResult.error(null, message));
    next();
});

router.post('/banner/upload', upload.single('banner'), function(req, res, next) {
    var { id } = req.body;
    var { tmp, root, product: { banner } } = assetsPath;
    var fileName = req.file.filename;
    var filePath = banner + fileName;
    var fromPath = path.join(tmp, fileName);
    var toPath = path.join(root, banner, fileName);
    res.myPromise = file.copy(fromPath, toPath)                 // 从temp中拷贝到最终目录中
        .then(() => file.unlink(fromPath))      // 从temp中删除临时文件
        .then(() => query('CALL p_uploadProductBanner(?,?);', [ filePath, id ]))
        .then(data => httpResult.success(filePath))
        .catch(message => httpResult.error(null, message));
    next();
});

router.post('/banner/remove', function(req, res, next) {
    var { id, filePath, newBannerImgs } = req.body;
    res.myPromise = query('UPDATE `dt_product` SET `bannerImgs` = ? WHERE `id` = ?', [ newBannerImgs, id ])
        .then(() => file.unlink(path.join(assetsPath.root, filePath)))
        .then(() => httpResult.success())
        .catch(message => httpResult.error(null, message));
    next();
});

module.exports = router;