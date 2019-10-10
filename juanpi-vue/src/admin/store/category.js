import http from '../util/http.js';

export default {
        namespaced: true,
        state:{
                list: [],                           //存放一级分类和二级分类得数据
                fids: [],                       //记录已经访问过的fid
        },
        getters: {
                mainList(state) { return state.list.filter(item => item.fid === 0); },
        },
        mutations: {
                _appendData:function(state,data) { state.list = state.list.concat(data); },
                _recordFid: function(state, fid) { state.fids.push(fid); },
                _addCategory(state,item) {
                        if(state.fids.indexOf(item.fid) !== -1) state.list.push(item.fid);
                },
                _removeCategory(state,id) {
                        let i =state.list.findIndex(item => item.id === id);
                        state.list.splice(i,1);
                },
                _updateCategory(state,data) {
                        let oldData = state.list.find(item => item.id === data.id);
                        if(oldData.fid !== data.fid && state.fids.indexOf(data.fid) === -1 ) {
                                //如果修改分时更换了父分类，且父分类没有被懒加载过
                                if(oldData.fid !== data.fid && state.fids.indexOf(data.fid) === -1) {
                                        let i = state.list.findIndex(item => item.id === data.id);
                                        state.list.splice(i,1);
                                } else {
                                        let i = state.list.findIndex(item => item.id === data.id);
                                        state.list.splice(i,1,data);
                                }
                        }
                }
        },
        actions: {
                getData: function({ state,commit },fid) {
                        if(state.fids.indexOf(fid) !== -1)
                                return Promise.resolve(state.list.filter(item => item.fid === fid) );
                        else return http({
                                method:'get',
                                url:'/category/list/' + fid
                        })
                                .then(data => {
                                        commit('_recordFid', fid);
                                        commit('_appendData',data);
                                        return data;
                                });
                },
                addCategory({ commit },ajaxData) {
                        return http({
                                url:'/category/update',
                                data: ajaxData,
                        })
                                .then(id => {
                                        commit('_addCategory', Object.assign({}, ajaxData, {id, avatar: '/images/category/' + ajaxData.avatar }));
                                        if(ajaxData.fid === 0) commit('_recordFid', id);
                                        return id;
                                });
                },
                removeCategory({ commit }, ajaxData) {
                        return http({
                                url: '/category/remove',
                                data: ajaxData,
                        })
                                .then(() => commit('_removeCategory', ajaxData.id));
                },
                updateCategory({ commit }, ajaxData) {
                        return http({
                                url: '/category/update',
                                data: ajaxData,
                        })
                                .then(() => {
                                        let { oldAvatar, ...data } = ajaxData;
                                        data.avatar = data.avatar !== '' ? '/images/category/' + data.avatar : oldAvatar;
                                        commit("_updateCategory",data);
                                        return data;
                                });
                }
        }
}
