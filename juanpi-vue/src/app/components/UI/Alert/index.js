import Vue from 'vue';

const AlertConstructor = Vue.extend(require('./Alert.vue').default);

export default text => {
        //代码的方式创建 Notice 组件对象并挂载
        let instance = new AlertConstructor({ data: { text }}).$mount();
        //将 instance 对应的 dom 元素对象显示在页面上
        document.body.appendChild(instance.$el);
}