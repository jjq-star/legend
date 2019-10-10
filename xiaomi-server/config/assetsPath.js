/* 
* @Author: liwenqi
* @Date:   2019-09-04 08:41:11
* @Last Modified by:   liwenqi
* @Last Modified time: 2019-09-04 08:45:23
*/

'use strict';
// 将所有图片资源的路径进行统一保存
var path = require('path');

module.exports = {
    tmp: path.join(__dirname, '../tmp'),
    root: path.join(__dirname, '../public'),
    category: '/images/category/',
    product: {
        banner: '/images/product/banner/',
        avatar: '/images/product/avatar/'
    },
};