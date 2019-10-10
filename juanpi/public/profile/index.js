//请求数据
http({
	method: 'post',
	url: '/profile/phone'
}).then(function(result) {
	// console.log(result);
	$('span.phone').text(result);
	if(result == '') $(button.btn-edit).addClass('hide');
});
// 点击退出按钮
$('button.btn-edit').click(function() {
	// $('.edit-login').toggle();
	// $('.header>.header-bottom').toggleClass('hide');
	http({
		method: 'post',
		url: '/profile/exit'
	}).then(function() {
		sessionStorage.removeItem('token');
		window.location.href = '/login/index.html';
	});
});