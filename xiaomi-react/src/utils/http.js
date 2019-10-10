import fetch from 'isomorphic-fetch';
import history from '../history';

let defaultOptions = {                                  //默认配置
        method: 'post',                                 //将 fetch 发送 ajax 请求类型 默认为 post
        credentials: "include",                      //将 fetch 发送 ajax请求设置成携带 cookie
        mode: 'cors',                                   //将 fetch 发送 ajax请求设置成 支持跨域
        headers: { 'Content-Type': 'application/json'}  // 设置 fetch 发送ajax 请求携带数据的格式类型为：application/json,  即 json 字符串
};

function http(url,options = {}) {
        options = Object.assign({}, defaultOptions, options);       //合并 fetch 默认配置和用户配置
        //动态判定是否携带 token 在 headers 头部
        if(options.withToken) {
                options.headers.Authorization = sessionStorage.getItem("token");
        }
        return fetch(url, options)
        //检查 fetch 返回的 status 是不是在 200-300之间
                .then(response => {
                        if(response.status >= 200 && response.status < 300) return response;
                        throw new Error(response.statusText);
                })
                //fetch 从服务器拿回的数据是一个 流的形式，不能直接使用，需要做处理：
                //如果预期到服务器返回的是一个字符串，则调用 response.string（ 进行转化
                //如果预期到服务器返回的是 一个对象，则调用 response.json()进行转化
                .then(response => response.json())
                .then(({ status, data, message }) => {
                        switch(status) {
                                case 200:
                                        if(message) alert(message);
                                        return data;
                                case 401:
                                        sessionStorage.removeItem('token');
                                        sessionStorage.removeItem('name');
                                        //强制让路有刷新
                                        history.replace(history.location.pathname);
                                        throw new Error("您未登录或登录超时， 请登录...");
                                case 199:
                                case 500:
                                default:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        alert(err.message);
                        return new Promise(() => {});
                });
}

// 不带延时的 请求
//export default http;
// 带 延时的请求
export default function(url, options) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                        http(url, options)
                                .then(data => resolve(data));
                },600);
        });
};