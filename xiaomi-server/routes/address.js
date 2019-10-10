/* 
* @Author: liwenqi
* @Date:   2019-08-14 13:32:25
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-08-30 10:20:12
*/

'use strict';
var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
// var Token = require('../utils/token.js');

var router = express.Router();


router.post('/list', function(req, res, next) {
    var name = 'zhangsan';
    var sql = 'SELECT * FROM `dt_address` WHERE `name` = ?;';
    res.myPromise = query(sql, [ name ])
        .then(results => {
            return httpResult.success(results);
        });
    next();
});
router.post('/add', function(req, res, next) {
    // var name = 'zhangsan';    //伪造的名字
    var name = req.token.name;
    var { receiveName, receiveTel, receiveAddress, receiveAddressDetail} = req.body;
    var sql = 'INSERT `dt_address`(`name`, `receiveName`, `receiveTel`, `receiveAddress`, `receiveAddressDetail`, `isDefault`) VALUES (?,?,?,?,?,0);';
    res.myPromise = query(sql, [name, receiveName, receiveTel, receiveAddress, receiveAddressDetail]).then(results => {
        // consoloe.log(results);
        return httpResult.success(results.insertId);
    });
    next();
});
router.post('/delete/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'DELETE FROM `dt_address` WHERE `id` = ?;';
    res.myPromise = query(sql, [ id ])
        .then(results => {
            if(results.affectedRows === 1) return httpResult.success();
            else return httpResult.failure(null, '删除失败');
        });
    next();
});
router.post('/default/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    // var name = 'zhangsan';
    var name = req.token.name;
    var sql = 'CALL p_setDefaultAddress(?,?);';
    res.myPromise = query(sql, [id, name])
        .then(results => {
            return httpResult.success();
        });
    next();
});
router.post('/update/:id', function(req, res, next) {
    var {  receiveName, receiveTel, receiveAddress, receiveAddressDetail} = req.body;
    var id = parseInt(req.params.id);
    var sql = 'UPDATE `dt_address` SET `receiveName` = ?,`receiveTel` = ?,`receiveAddress` = ?,`receiveAddressDetail` = ? WHERE `id` = ?;';
    res.myPromise = query(sql, [ receiveName, receiveTel, receiveAddress, receiveAddressDetail, id ])
        .then(results => {
            if(results.affectedRows === 1) return httpResult.success();
            else return httpResult.failure(null, '修改失败');
        });
    next();
});
module.exports = router;