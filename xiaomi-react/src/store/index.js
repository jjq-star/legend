// 这是总仓库(总 reducer）
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import category,{ actions as CategoryActions } from './category.js';
import product, { actions as ProductActions } from './product.js';
import cart, { actions as CartActions } from './cart.js';

//1.导入所有的子仓库（子 reducer 函数，合并成总reducer函数，通过 总reducer函数 创建redux 仓库对象，并导出给根实例使用
const reducer = combineReducers({
        category,
        product,
        cart
});
const store = createStore(
        reducer,
        compose(
                // thunk 升级了 dispatch 函数， 让 dispatch 函数可以接受一个函数作为参数，我们就可以在这个参数函数中 发 ajax
                applyMiddleware(thunk),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
);
export default store;
//2.统一导入所有子仓库的 actions 并统一导出，方便组件 dispatch 发送 action时，代码更加的优雅
export {
        CategoryActions,
        ProductActions,
        CartActions
};
