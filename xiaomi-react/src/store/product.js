import API from '../utils/api.js';

// list 子仓库
const initialState = {
        list: [],                               //保存商品列表页面用户观看的商品数据
        sId: 0,                               //保存当前商品列表页面中商品对应分类 id
        name: "",                         //保存商品列表页 当前商品名的筛选条件
        orderCol: "price",           //保存商品列表当前的 排序列的名字
        orderDir: "DESC",           //保存商品列表数据当前的排序方向
        count: 6,                          //保存商品列表页容量
        hasMore: true,
        isLoading: false,              //标识 当前是否正处于 商品加载状态
};

const actionTypes = {
        CHANGESID: 'PRODUCT/CHANGESID',
        CHANGENAME: 'PRODUCT/CHANGENAME',
        TOGGLEORDER: 'PRODUCT/TOGGLEORDER',
        LOADMORE: 'PRODUCT/LOADMORE',
        APPENDDATA: 'PRODUCT/APPENDDATA'
};

export const actions = {
        changeSId: sId => (dispatch, getState) => {
                let state = getState().product;
                if(sId === state.sId) return Promise.resolve();
                dispatch({ type: actionTypes.CHANGESID, payload: { sId } });
                return API.product.getData({ cid: sId, name: state.name, start: 0, count: state.count, orderCol: state.orderCol, orderDir: state.orderDir })
                        .then(data => {
                                dispatch({ type: actionTypes.APPENDDATA, payload: { data }  });
                        });
        },
        changeName: name => (dispatch, getState) => {
                let state = getState().product;
                if(name === state.name) return Promise.resolve();
                dispatch({ type: actionTypes.CHANGENAME, payload: { name } });
                return API.product.getData({ cid: state.sId, name, start: 0, count: state.count, orderCol: state.orderCol, orderDir: state.orderDir })
                        .then(data => {
                                dispatch({ type: actionTypes.APPENDDATA, payload: { data }  });
                        });
        },
        toggleOrder: orderCol => (dispatch, getState) => {
                let state = getState().product;
                let payload = {};
                if(orderCol === state.orderCol) {
                        payload.orderCol = state.orderCol;
                        payload.orderDir = state.orderDir === 'ASC' ? 'DESC' : 'ASC';
                } else {
                        payload.orderCol = orderCol;
                        payload.orderDir = state.orderDir;
                }
                dispatch({ type: actionTypes.TOGGLEORDER, payload });
                return API.product.getData({ cid: state.sId, name: state.name, start: 0, count: state.count, ...payload })
                        .then(data => {
                                dispatch({ type: actionTypes.APPENDDATA, payload: { data }  });
                        });
        },
        loadMore: () => (dispatch, getState) => {
                let state = getState().product;
                dispatch({ type: actionTypes.LOADMORE });
                return API.product.getData({ cid: state.sId, name: state.name, start: state.list.length, count: state.count, orderCol: state.orderCol, orderDir: state.orderDir })
                        .then(data => {
                                dispatch({ type: actionTypes.APPENDDATA, payload: { data }  });
                        });
        }
};

function reducer(state = initialState, action = {}) {
        switch(action.type) {
                case actionTypes.CHANGESID:             // sId改变
                        return Object.assign({}, state, { sId: action.payload.sId, list: [], hasMore: true, isLoading: true });
                case actionTypes.CHANGENAME:        // name改变
                        return Object.assign({}, state, { name: action.payload.name, list: [], hasMore: true, isLoading: true });
                case actionTypes.TOGGLEORDER:        // 排序列及排序方向改变
                        return Object.assign({}, state, { ...action.payload, list: [], hasMore: true, isLoading: true });
                case actionTypes.LOADMORE:
                        return Object.assign({},state, { isLoading: true});
                case actionTypes.APPENDDATA:          // 追加数据
                        return Object.assign({}, state, { list: [ ...state.list, ...action.payload.data ], hasMore: action.payload.data.length === state.count, isLoading: false });
                default:
                        return state;
        }
}

export default reducer;