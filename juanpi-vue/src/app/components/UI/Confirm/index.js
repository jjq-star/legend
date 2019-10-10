import Vue from 'vue';

const ConfirmConstructor = Vue.extend(require('./Confirm.vue').default);

export default text => {
        return new Promise(resolve => {
                //代码的方式创建 Notice 组件对象并挂载
                let instance = new ConfirmConstructor({ data: { text,resolve }}).$mount();
                //将 instance 对应的 dom 元素对象显示在页面上
                document.body.appendChild(instance.$el);
        });
}