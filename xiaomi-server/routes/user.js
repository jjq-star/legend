/* 
* @Author: liwenqi
* @Date:   2019-08-08 13:39:29
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-09-10 14:48:34
*/

'use strict';
var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config/index.js');
// var jwt = require('jsonwebtoken');
var Token = require('../utils/token.js');



var router = express.Router();
router.post('/login/pwd', function(req, res, next) {
    var { name, pwd } = req.body;
    var sql = 'SELECT count(*) AS count FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
    res.myPromise = query(sql, [ name, pwd ])
        .then(results => {
            if(results[0].count > 0) {
                // 计算 token
                // var token = jwt.sign({ name: name }, 'aaa', { expiresIn: '1h'});
                // return httpResult.success(token);
                return httpResult.success(Token.generate({ name: name }));
            } else {
                return httpResult.failure(null, '用户名或密码错误');
            }
        });
    next();
});
//后台管理系统 登录
router.post('/login/admin',function(req, res, next) {
    var { name, pwd } = req.body;
    var sql = 'SELECT count(*) AS count FROM `dt_admin` WHERE `name` = ? AND `pwd` = ?;';
    res.myPromise = query(sql, [ name, pwd ])
        .then(results => {
            if(results[0].count > 0) {
                return httpResult.success(Token.generate({ name: name }));
            } else {
                return httpResult.failure(null, '用户名或密码错误');
            }
        });
    next();
});
//后台管理系统   密码修改
router.post('/changepwd',Token.check,function(req,res,next) {
    var name = req.token.name;
    var { oldPwd,newPwd } = req.body;
    var sql = 'CALL p_password(?,?,?);';
    res.myPromise = query(sql, [name, oldPwd, newPwd])
        .then(results => {
            if(results[0][0].result === '') return httpResult.success(null, '新密码修改成功');
            else return httpResult.failure(null, '原始密码错误');
        });
    next();
});

module.exports = router;