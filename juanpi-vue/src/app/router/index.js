//当前应用程序路由核心配置文件
import Vue from 'vue';          //导入 vue
import Router from 'vue-router';               //导入 vue-router
//导入 所有的 页面级组件
import page from '../page';


Vue.use(Router);                //向 vue体系 注册 vue-router体系中的组件
//创建核心路由对象
const router = new Router({
   // mode:'history',              //路由的格式
   routes: [
           { path: '/', redirect: '/home' },
           { path: '/home', component: page.Home },
           {
                   path: '/address',
                   component: page.Address,
                   meta: {  authenticate: true }
           },
           {
                   path: '/cart',
                   component: page.Cart,
                   meta: {  authenticate: true }
           },
           { path: '/category', component: page.Category},
           { path: '/detail/:id', component: page.Detail },
           {
                   path: '/list/:mId/:sId',
                   component: page.List ,
                   meta: { keepAlive: true }                            //标识该组件需要被缓存
           },
           { path: '/login', component: page.Login,name:'login' },
           { path: '/order', component: page.Order },
           { path: '/profile', component: page.Profile },
           { path: '/register', component: page.Register },
           { path: '/pay', component: page.Pay }

   ]
});

router.beforeEach((to,from,next) => {
        if(to.meta.authenticate && !sessionStorage.getItem('token'))
                router.push({ name: 'login', params: { reference: to.fullPath} });
        //如果是直接访问登录页面 或 401 跳转到登录页
        else if(to.fullPath === '/login' && !to.params.reference ) {
                to.params.reference = from.fullPath;
                next();
        }
        else
                next();
});

//导出核心路由对象：
export default router;
