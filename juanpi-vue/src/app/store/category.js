import http from '../util/http.js';

export default {
        namespaced: true,
        state:{
                activeId: 0,                    //记录当前激活的一级分类的Id
                list: [],                           //存放一级分类和二级分类得数据
                fids: [],                       //记录已经访问过的fid
        },
        getters: {
                subList: function(state) {
                        return state.activeId === 0 ? [] : state.list.filter(item => item.fid === state.activeId);
                },
        },
        mutations: {
                //向 state节点中 list 追加数据
                _appendData:function(state,payload) { state.list = state.list.concat(payload); },
                _recordFid: function(state, payload) { state.fids.push(payload); },
                _toggleId: function(state, payload) { state.activeId = payload; }
        },
        actions: {
                _getData: function({ commit },fid) {
                        return http({
                                method:'get',
                                url:'/category/list/' + fid
                        })
                                .then(data => {
                                        commit('_recordFid', fid);
                                        commit('_appendData',data);
                                        return data;
                                });
                },
                toggleId:function({ state, dispatch,commit }, id) {
                        commit('_toggleId', id);
                        if(state.fids.indexOf(id) !== -1) return Promise.resolve();     //让 toggleId 这个函数一直返回 一个 Promise 对象
                        return dispatch('_getData', id);
                },
                //初始化 一级分类并 默认让第一个一级分类激活 并请求第一个一级分类的二级分类
                init: function( { state,dispatch } ) {//init 函数只负责请求一级；他返回的是一个 Promise 对象，正好是 getdata函数返回的那个Promise
                        //解构；  也可以在函数中直接进行解构
                        // let { state, commit, dispatch, getters,rootState,rootGetters} = store;
                        //让 init 函数始终返回一个 Promise 对象，因此这里也返回一个 Promise----
                        // 用户先进入列表页然后在进入分类页时，默认激活分类页的第一个id时返回 state.list[0].id
                        // 用户先进入列表页然后在进入分类页时，默认激活刚刚访问的列表 对应的分类页的id
                        if(state.activeId !== 0) return  Promise.resolve([state.list[0]]);
                        return dispatch('_getData', 0);
                }
        }
}
