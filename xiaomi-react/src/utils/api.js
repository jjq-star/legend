import http from './http.js';

export default {
        category: {
                getData(fid) {
                        return http('/category/list/' + fid, { method: 'get' });
                }
        },
        product: {
                // ajaxData = { cid: ?, name: ?, start: ? ,count: ?, orderCol: ?, orderDir: ? }
                getData(ajaxData) {
                        return http('/product/list', { body: JSON.stringify(ajaxData) });
                },
                getModel(id) {
                        return http('/product/model/' + id, { method: 'get'} );
                }
        },
        user: {
                //ajaxData = { name: ?, pwd: ? }
                loginWithPwd(ajaxData) {
                        return http('/user/login/pwd', { body: JSON.stringify(ajaxData) });
                }

        },
        cart: {
                getCartInfo() {
                        return http('./cart/list', { withToken: true });
                },
                remove(ajaxData) {
                        return http('/cart/delete', { body: JSON.stringify(ajaxData), withToken: true });
                },
                increase(id) {
                        return http('/cart/increase/' + id, { withToken: true, method: 'get' });
                },
                decrease(id) {
                        return http('/cart/decrease/' + id, { withToken: true, method: 'get' });
                },
                getCount() {
                        return http('/cart/getcount', { withToken: true, method: 'get' });
                },
                //ajaxData = { pid:? 商品的 id, count: ? }
                addProduct(ajaxData) {
                        return http('/cart/addproduct', { body: JSON.stringify(ajaxData), withToken: true });
                }

        }
}