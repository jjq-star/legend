import http from '../util/http.js';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default {
        namespaced: true,
        state() {
                return {
                        list: [],
                        orderId:'',                     //订单号
                        orderTime:''                  //下单时间
                }
        },
        mutations: {
                reset(state) { state.list = []; },
                _init(state,payload) {
                        // 给 item 添加两个新的属性 ： select1, select2-------核心思想，数据驱动
                        payload.forEach(item => {
                                item.select1 = true;
                                item.select2 = false
                        });
                        state.list = payload;
                },
                //切换 全选/反选按钮
                toggleAllSelect1(state,payload) { state.list.forEach(item => item.select1 = payload); },
                toggleAllSelect2(state,payload) { state.list.forEach(item => item.select2 = payload); },
                //切换 单个商品的选中状态
                toggleSelect1(state,payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.select1 = !target.select1;
                },
                toggleSelect2(state,payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.select2 = !target.select2;
                },
                _decrease(state, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.count = target.count - 1;
                },
                _increase(state, payload) {
                        let target = state.list.find(item => item.id === payload);
                        if(target) target.count = target.count + 1;
                },
                _remove(state,payload) {
                        let i = -1;
                        payload.forEach(id => {
                                i = state.list.findIndex(item => item.id === id);
                                if(i !== -1) state.list.splice(i,1);
                        })
                },
                _recordOrderId(state,payload) {
                        state.orderId = payload;
                },
                _recordOrderTime(state,payload) {
                        state.orderTime = payload;
                }
        },
        actions: {
                init({ commit }, payload) {
                        http({
                                url: '/cart/list',
                                withToken: true
                        }).then(data => commit('_init', data) );
                },
                decrease({ commit }, { id,loadingEl,count }) {
                        if(count === 1) {
                                Vue.prototype.$notice('不能在减了哦...');
                                return;
                        }
                        else
                                http({
                                        method: 'get',
                                        url: '/cart/decrease/' + id,
                                        loading: false,
                                        loadingEl,
                                        withToken: true,
                                }).then(() => commit('_decrease', id));
                },
                increase({ commit }, { id,loadingEl,count }) {
                        if(count === 10) {
                                Vue.prototype.$notice('已经够多了...');
                                return;
                        }
                        else
                                http({
                                        method: 'get',
                                        url: '/cart/increase/' + id,
                                        loading: false,
                                        loadingEl,
                                        withToken: true,
                                }).then(() => commit('_increase', id));
                },
                settlement({ state, commit}, addressId) {         //payload 是指 事件对象e
                        let ids = [],account = 0,sizes = [];
                        state.list.forEach(item => {
                                if(item.select1) {
                                        ids.push(item.id);
                                        sizes.push(item.size);
                                        account += item.count * item.price;
                                }
                        });
                        http({
                                url: '/cart/settlement',
                                data: { settlementId: JSON.stringify(ids),size:JSON.stringify(sizes), account: account,addressId: addressId },
                                loading: false,
                                withToken: true
                        }).then((results) => {
                                commit('_recordOrderId',results[0][0].id);
                                commit('_recordOrderTime',results[0][0].shoppingTime);
                                commit('_remove',ids);
                        });
                },
                remove({ state,commit } ) {
                        return Vue.prototype.$confirm('确定移除该商品吗?')
                                .then(() => {
                                        let ids = [];
                                        state.list.forEach(item => {
                                                if(item.select2) ids.push(item.id);
                                        });
                                        http({
                                                url: '/cart/delete',
                                                data: { deleteId: JSON.stringify(ids)},
                                                loading: false,
                                                withToken: true
                                        }).then(() => commit('_remove', ids));
                                });
                }
        }
}