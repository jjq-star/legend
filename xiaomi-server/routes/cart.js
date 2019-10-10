/* 
* @Author: liwenqi
* @Date:   2019-08-05 11:41:08
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-09-11 16:10:00
*/

'use strict';
var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
// var checkToken = require('../utils/token.js');
// var Token = require('../utils/token.js');
var router = express.Router();

router.post('/addproduct', function(req, res, next) {
    var pid = parseInt(req.body.pid);
    var count = parseInt(req.body.count);
    // 伪造的，实际中的 name 应该从 session 容器中获取
    // var name = 'zhangsan';
    var name = req.token.name;
    console.log(name);
    res.myPromise = query('CALL p_addProductToCart(?,?,?,?);', [ name, pid, count, new Date()])
        .then(results => {
            if(results[0][0].result === '')
                return httpResult.success(results[0][0].result);
            else 
                return httpResult.failure(null, results[0][0].result);
        });
    next();
});
router.get('/getcount', function(req, res, next) {
    // var name = 'zhangsan';
    var name = req.token.name;
    var sql = 'SELECT sum(`count`) as count FROM `dt_cart` WHERE `name` = ?;';
    res.myPromise = query(sql, [ name ])
        .then(results => {
            return httpResult.success(results[0].count);
        });
    next();
});

router.post('/list', function(req, res, next) {
    // var name = 'zhangsan';    //name 是伪造的，需要从 session 容器中获取
    var name = req.token.name;
    var sql = 'CALL p_getCartInfo(?);';
    res.myPromise = query(sql, [ name ])
        .then(results => {
            console.log(results);
            return httpResult.success(results[0]);
        })
    next();
});

router.get('/increase/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'UPDATE `dt_cart` SET `count` = `count` + 1 WHERE `id` = ?;';
    res.myPromise = query(sql, [ id ]).then(results => {
        if(results.affectedRows === 1) return httpResult.success();
        else return httpResult.failure(null, '失败');
    });
    next();
});
router.get('/decrease/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'UPDATE `dt_cart` SET `count` = `count` - 1 WHERE `id` = ?;';
    res.myPromise = query(sql, [ id ]).then(results => {
        if(results.affectedRows === 1) return httpResult.success();
        else return httpResult.failure(null, '失败');
    });
    next();
});
router.post('/delete', function(req, res, next) {
    var ids = JSON.parse(req.body.ids);
    var sql = 'DELETE FROM `dt_cart` WHERE `id` IN (?);' ;
    res.myPromise = query(sql, [ ids ])
        .then(results => {
            if(results.affectedRows === ids.length) {
                return httpResult.success();
            } else {
                return httpResult.failure(null, '删除失败');
            }
        });
    next();
});

router.post('/settlement', function(req, res, next) {
    var ids = JSON.parse(req.body.ids).join(',');
    var account = parseFloat(req.body.account);
    var addressId = parseInt(req.body.addressId);
    // var name = 'zhangsan';
    var name = req.token.name;
    var sql = 'CALL p_settlement(?,?,?,?,?);';
    res.myPromise = query(sql, [ ids, account, new Date(), name,addressId])
        .then(() => httpResult.success());
    next();
})
module.exports = router;