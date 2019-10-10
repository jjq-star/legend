import API from '../utils/api.js';
// category 子仓库（子 reducer）
const initialState = {
        list: [],
        fids: []
};
// action types 枚举
const actionTypes = {
        APPENDDATA: 'CATEGORY/APPENDDATA'
};
//actions creator
export const actions = {
        getData(fid) {
                return function(dispatch, getState) {
                        if(getState().category.fids.indexOf(fid) !== -1 )
                                return Promise.resolve();
                        else
                                return API.category.getData(fid).then(data => {
                                        dispatch({ type: actionTypes.APPENDDATA, payload: { fid, data } })
                                });
                }
        }
};

//action= { type: '', payload: { fid: ?, data: ?} }
export default function reducer(state = initialState, action = {}) {
        switch(action.type) {
                case actionTypes.APPENDDATA:
                        return Object.assign({}, state, {
                                list: [...state.list, ...action.payload.data ],
                                fids: [...state.fids, action.payload.fid ]
                        });
                default:
                        return state;
        }
};