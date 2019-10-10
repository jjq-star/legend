import axios from 'axios';
import store from '../store';              //将仓库导入
import router from '../router';
import Vue from 'vue';
const alwaysPendingPromise = new Promise(() => {});
//返回一个 Promise 对象
function http(options) {
        let defaultOptions = { method: 'post',loading: true,withToken: false };                  //多传一个键 loading来判断是否需要loading这个组件，默认为 true
        options = Object.assign({}, defaultOptions,options);
        if(options.loading) store.commit('loading/show');                                    //让 loading 组件显示
        if(options.loadingEl) {
                options.loadingEl.className +=' http-loading';                     //为指定的元素添加 loading 效果
                options.loadingEl.disabled = true;                                         //禁用指定的 dom 元素
        }
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                };
        }
        return axios(options)
                .then(response => {
                        if(options.loading) setTimeout(() => store.commit('loading/hide') ,500);
                        if(response.status ===200) return response.data || JSON.parse(response.requestText);
                        else throw new Error(response.statusText);
                })
                .then(result => {
                        let{status, data, message} = result;
                        switch(status) {
                                case 200:
                                        if(options.loading) setTimeout(() => store.commit('loading/hide'),500);       //关闭loading组件
                                        if(options.loadingEl) {
                                                setTimeout(() => {
                                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                                        options.loadingEl.disabled = false;                                                //恢复指定 dom元素的正常状态
                                                },1000);
                                        }
                                        if(message !== '') Vue.prototype.$alert(message);
                                        return data;
                                case 401:
                                        sessionStorage.removeItem('token');     //不管是 没登录 还是 token 过期都把 sessionStorage 里的token 清除
                                        message = '您未登录或登录超时，请重新登陆';
                                        router.push('/login');               //路由跳转到登录
                                case 500:
                                case 199:
                                        throw new Error(message);
                        }
                })
                .catch(err => {
                        if(options.loadingEl) {
                                setTimeout(() => {
                                        options.loadingEl.className = options.loadingEl.className.replace(' http-loading', '');
                                        options.loadingEl.disabled = false;                                                //恢复指定 dom元素的正常状态
                                },1000);
                        }
                                Vue.prototype.$alert(err.message);
                        return alwaysPendingPromise;           //返回一个永远 pending 的promise对象
                });
}


export default http;