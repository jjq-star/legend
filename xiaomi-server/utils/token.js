/* 
* @Author: liwenqi
* @Date:   2019-08-08 14:35:29
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-08-08 19:23:40
*/

'use strict';
var jwt = require('jsonwebtoken');
var httpResult = require('../config/index.js');

// function checkToken(req, res, next) {
//     var token = req.get('Authorization');
//     jwt.verify(token, 'aaa', function(err, decoded) {
//         if(err) {
//             res.send(httpResult.untoken());
//             return;
//         }
//         req.token = decoded;
//         next();
//     });
// };
// 封装
var secret = 'aaa';
var Token = {
    //生成 token
    generate: payload => jwt.sign(payload, secret, { expiresIn: '1h'}),
    // 验证 token
    check: (req, res, next) => {
        jwt.verify(req.get('Authorization'), secret, function(err, decoded) {
        if(err) {
            res.send(httpResult.untoken());
            return;
        }
        req.token = decoded;
        next();
    });
    }
}

module.exports = Token;