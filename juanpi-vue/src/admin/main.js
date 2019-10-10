import Vue from 'vue';
import App from './App.vue';
//引入 Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入路由对象
import router from './router';
//导入仓库
import store from './store';

Vue.use(ElementUI);

new Vue({
        el: '#app',
        components: { App },
        store,
        router,
        template: '<App />'
});