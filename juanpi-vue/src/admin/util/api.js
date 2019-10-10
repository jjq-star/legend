import http from './http.js';
//负责和服务器对接
export default {
        category: {
                getData(fid) { return http( { method: 'get', url: '/category/list/' + fid }); },
                // ajaxData = { fid: ? ,avatar: ? , name: ? }
                addCategory(ajaxData) {
                        return http({ url: '/category/add', data: ajaxData });
                },
                // ajaxData = { id: ? ,avatar: ? }
                removeCategory(ajaxData) {
                        return http({ url: '/category/remove', data: ajaxData });
                },
                // ajaxData = { id: ? ,fid: ? ,avatar: ? , name: ?, oldAvatar: ? }
                updateCategory(ajaxData) {
                        return http({ url: '/category/update', data: ajaxData });
                }
        },
        user: {
                login(ajaxData) {               // ajaxData 是： name   pwd
                        return http({ url: '/user/login/admin', data: ajaxData });
                },
                changePwd(ajaxData) {
                        return http({ url: '/user/changepwd', data: ajaxData, withToken: true });
                }
        },
        product: {
                // ajaxData = { name: ?, mId: ?, sId: ?, begin: ?, pageSize: ? }
                getProductData(ajaxData) {
                        return http({ url: '/list/admin-list', data: ajaxData });
                },
                //ajaxData = { id: ?, filePath: ? , newBannerImgs: ? }
                removeBanner(ajaxData) {
                        return http({ url: '/list/banner/remove', data: ajaxData });
                }
        },
}