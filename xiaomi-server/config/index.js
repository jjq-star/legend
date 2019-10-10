var httpResult = {
	// 成功
	success: (data = null, message = '') => ({ status: 200, data: data, message: message}),
	// 物理错误
	error: message => ({ status: 500, data: null, message: message}),
	// 逻辑失败
	failure: (data= null, message= "") => ({ status:199, data: data, message: message}),
    // token 验证失败
    untoken: () => ({ status: 401, data: null, message: ''})
};

module.exports = httpResult;