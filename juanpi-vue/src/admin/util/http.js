import axios from 'axios';
import { MessageBox, Loading } from 'element-ui';
import router from '../router';


//一个永远处于 peending 状态的 Promise；  const 常量
const alwaysPendingPromise = new Promise(() => {});
//创建 loading 对象
let loadingInstance= null;
//返回一个 Promise 对象
function http(options){
        let defaultOptions = { method: 'post',  withToken: false };
        options = Object.assign({}, defaultOptions, options);           //默认的配置与用户的配置经行合并
        if(options.withToken) {
                options.headers = {
                        Authorization: sessionStorage.getItem('token')
                };
        }
        loadingInstance = Loading.service();            //发送 ajax之前显示 loading
        return new Promise(resolve => {
                setTimeout(() => {
                        axios(options)
                                .then(response =>{
                                        if(options.loading) setTimeout(() => store.commit('loading/hide'),500);       //关闭loading组件
                                        if(response.status === 200) return response.data || JSON.parse(response.requestText)
                                        else throw new Error(response.statusText);
                                })
                                .then(result =>{
                                        let {status, data, message} = result;
                                        switch(status){
                                                case 200 :
                                                        if(message !== '') MessageBox.alert(message,'提示',{ showClose: false, type: 'success' });
                                                        loadingInstance.close();                        //关闭 loading
                                                        resolve(data);
                                                        break;
                                                case 401:                       //未登录状态
                                                        sessionStorage.removeItem('token');     //不管是 没登录 还是 token 过期都把 sessionStorage 里的token 清除
                                                        sessionStorage.removeItem('name');
                                                        message = '您未登录或登录超时，请重新登陆';
                                                        router.replace('/login');
                                                case 199:
                                                case 500:
                                                        throw new Error(message);
                                        }
                                })
                                .catch(err =>{
                                        MessageBox.alert(err.message,'警告',{ showClose: false, type: 'warning' });
                                        loadingInstance.close();                        //关闭 loading
                                        return alwaysPendingPromise;           //返回一个永远 pending 的promise对象
                                });
                },800)
        });
}

export default http;