//创建仓库对象并导出
import Vue from 'vue';
import Vuex from 'vuex';

//导入所有的子仓库
import category from './category.js';
import product from './product.js';
import loading from './loading.js';
import cart from './cart.js';
import address from './address.js';

Vue.use(Vuex);
//创建
const store = new Vuex.Store({
        //modules 中存放总仓库中的所有子仓库
        modules: {
                category,
                product,
                loading,
                cart,
                address
        },
        //state 中存放 想要放到仓库中的数据
        state: { },
        getters: {},
        mutations: {},
        actions: {}
});

export default store;