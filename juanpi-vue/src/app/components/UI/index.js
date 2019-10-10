//所有 vue 组建的母亲是 vue ，父亲是 Vue.prototype； javascript 规定父亲具有的属性和方法 儿子都有
import Vue from 'vue';
import notice from './Notice';
import alert from './Alert';
import confirm from './Confirm';

Vue.prototype.$notice = notice;
Vue.prototype.$alert = alert;
Vue.prototype.$confirm = confirm;