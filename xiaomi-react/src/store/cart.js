import API from '../utils/api.js';

const initialState = { list: [] };

const actionTypes = {
        INIT: 'CART/INIT',
        TOGGLEALLSELECT1:'CART/TOGGLEALLSELECT1',
        TOGGLEALLSELECT2: 'CART/TOGGLEALLSELCT2',
        REMOVE: 'CART/REMOVE',
        INCREASE: 'CART/INCREASE',
        DECREASE: 'CART/DECREASE',
        TOGGLESELECT1: 'CART/TOGGLESELECT1',
        TOGGLESELECT2: ' CART/TOGGLESELECT2'
};

export const actions = {
        init: () => (dispatch,getState) => {
                return API.cart.getCartInfo()
                        .then(data => {
                                data.forEach(item => {
                                        item.select1 = true;
                                        item.select2 = false;
                                });
                                dispatch({ type: actionTypes.INIT, payload: { data } });
                        });
        },
        toggleAllSelect1: checked => ({ type: actionTypes.TOGGLEALLSELECT1, payload: { checked } }),
        toggleAllSelect2: checked => ({ type: actionTypes.TOGGLEALLSELECT2, payload: { checked } }),
        remove: () => (dispatch, getState) => {
                let list = getState().cart.list, ids = [];
                list.forEach(item => {
                        if(item.select2) ids.push(item.id);
                });
                return API.cart.remove({ ids: JSON.stringify(ids) })
                        .then(() => dispatch({ type: actionTypes.REMOVE, payload: { ids } }));
        },
        increase: id => dispatch => {
                return API.cart.increase(id)
                        .then(() => dispatch({ type: actionTypes.INCREASE, payload: { id } }))
        },
        decrease: id => dispatch => {
                return API.cart.decrease(id)
                        .then(() => dispatch({ type: actionTypes.DECREASE, payload: { id } }))
        },
        toggleSelect1: id => ({ type: actionTypes.TOGGLESELECT1, payload: { id } }),
        toggleSelect2: id => ({ type: actionTypes.TOGGLESELECT2, payload: { id } }),
};

const reducer = (state = initialState, action = {}) => {
        let list = null, target = null;
        switch(action.type) {
                case actionTypes.INIT:
                        return Object.assign({}, state, { list: action.payload.data });
                case actionTypes.TOGGLEALLSELECT1:
                        list = state.list.slice(0);
                        list.forEach(item => item.select1 = action.payload.checked);
                        return Object.assign({}, state, { list });
                case actionTypes.TOGGLEALLSELECT2:
                        list = state.list.slice(0);
                        list.forEach(item => item.select2 = action.payload.checked);
                        return Object.assign({}, state, { list });
                case actionTypes.REMOVE: //{ type: ? , payload: { ids: [] }
                        list = state.list.slice(0);
                        action.payload.ids.forEach(id => {
                                let i = list.findIndex(item => item.id === id);
                                list.splice(i,1);
                        });
                        return Object.assign({}, state, { list });
                case actionTypes.INCREASE:
                        list = state.list.slice(0);
                        target = list.find(item => item.id === action.payload.id);
                        target.count += 1;
                        return Object.assign({}, state, { list });
                case actionTypes.DECREASE:
                        list = state.list.slice(0);
                        target = list.find(item => item.id === action.payload.id);
                        target.count -= 1;
                        return Object.assign({}, state, { list });
                case actionTypes.TOGGLESELECT1:
                        list = state.list.slice(0);
                        target = list.find(item => item.id === action.payload.id);
                        target.select1 = !target.select1;
                        return Object.assign({}, state, { list });
                case actionTypes.TOGGLESELECT2:
                        list = state.list.slice(0);
                        target = list.find(item => item.id === action.payload.id);
                        target.select2 = !target.select2;
                        return Object.assign({}, state, { list });
                default:
                        return state;
        }
};

export default reducer;