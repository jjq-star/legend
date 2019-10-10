import http from '../util/http.js';

export default {
        namespaced:true,
        state: {
                list: [],               //保存商品列表当前显示的数据
        },
        getters: {},
        mutations: {
                _reset: function(state) { state.list = []; },
                _appendData: function(state, payload) { state.list = state.list.concat(payload) }
        },
        actions: {
                getData({ state,commit },payload) {
                        if(payload.start === 0) commit('_reset');
                        return new Promise (resolve => {
                                setTimeout(function() {
                                        http({
                                                data: payload,
                                                url: '/list/products',
                                                loading: false
                                        })
                                                .then(data => {
                                                        commit('_appendData',data);
                                                        resolve(data.length);
                                                });
                                },1000);
                        });
                },
                getItem({ state }, payload) {                                   //详情组件
                        let target = state.list.find(item => item.id === payload);
                        if(target) return Promise.resolve(target);
                        else return http({
                                method: 'get',
                                url: '/list/detail/' + payload,
                        });
                }
        }
}