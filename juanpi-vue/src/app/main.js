//源代码入口文件（根实例）
import Vue from 'vue';          //导入 vue
import router from './router';  //导入路由对象
import store from './store';     //导入仓库
import App from './App';                //导入根组件
//这里的导入不是为了接收什么东西，仅仅是为了要执行各个文件
import './components/UI';               //向 vue 注入 公共函数式组件

//创建根实例，并将根实例中的 template指定的内容渲染到 el 指定的 挂载至根结点
new Vue({
   el: '#app',
   components: { App },                 //注册根组件
   template: '<App />',
   router,                                       //根实例 使用 router 键 来注入路由对象
   store                                        //根实例 使用 store 键 来注入仓库

});