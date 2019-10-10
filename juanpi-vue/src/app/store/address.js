import http from '../util/http.js';

export default {
        namespaced: true,
        state: {
                list: [],
        },
        mutations: {
                _init(state,payload){
                        state.list = payload;
                },
                _setDefault(state,payload) {
                        let i = state.list.findIndex(item => item.id === payload);
                        let target = state.list.find(item => item.id === payload);
                        let temp = Object.assign({}, target, { isDefault: 1 });
                        if(i  !== -1) state.list.splice(i, 1, temp);
                        state.list.forEach(item => item.isDefault = item.id === payload ? 1 : 0);
                },
                _removeAddress(state,payload) {
                        let i = state.list.findIndex(item => item.id === payload);
                        if(i !== -1) state.list.splice(i,1);
                },
                _addAddress(state,payload) {
                        state.list.push(payload);
                },
                _updateAddress(state,payload) {
                        let i = state.list.findIndex(item => item.id === payload.id);
                        if(i !== -1) state.list.splice(i,1,payload);
                }
        },
        actions: {
                init({ commit }) {
                        return http({
                                url: '/address/list',
                                loading: true,
                                withToken: true
                        }).then(data => commit('_init',data));
                },
                setDefault({ commit },payload) {
                        return http({
                                url: '/address/default/' + payload,
                                loading: false,
                                withToken: true,
                        }).then(() => commit('_setDefault',payload))
                },
                removeAddress({ commit },payload) {
                        http({
                                url: '/address/delete/' + payload,
                                loading: false,
                                withToken: true,
                        }).then(() => {
                                commit('_removeAddress', payload);
                        });
                },
                addAddress({ commit,state,dispatch },payload) {
                        http({
                                url: '/address/add',
                                data: { ...payload },
                                loading: false,
                                withToken: true,
                        })
                                .then(id => {
                                        commit('_addAddress',Object.assign({},payload, { id }));
                                        return id;
                                })
                                .then(id => {
                                        console.log(state.list.length);
                                        if(state.list.length === 1) return dispatch('setDefault',id);
                                });
                },
                updateAddress({ commit },payload) {
                        http({
                                url: '/address/update/' + payload.id,
                                data: { ...payload },
                                loading: false,
                                withToken: true
                        }).then(() => {
                                commit('_updateAddress', Object.assign({},payload));
                        });
                }
        }
}