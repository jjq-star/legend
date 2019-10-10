import Vue from 'vue';

//创建Notice 组件的构造函数
const NoticeConstructor = Vue.extend(require('./Notice.vue').default);

export default text => {
        //代码的方式创建 Notice 组件对象并挂载
        let instance = new NoticeConstructor({ data: { text }}).$mount();
        //将 instance 对应的 dom 元素对象显示在页面上
        document.body.appendChild(instance.$el);


}