// 验证手机号
function checkPhone($tel) {
	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($tel))){ 
	    alert("手机号码有误，请重填");  
	    return false; 
	} else{
		return 1;
	}
}
$('.content>form>input').on('input', function() {
	var $name = $('input.name').val();
	var $phone = $('input.phone').val();
	var $pwd = $('input.pwd').val();
	var $code = $('input.code').val();
	if($name !== '' && $phone !== '' && $pwd !== '' && $code !== '') {
		console.log('aa');
		$('button.btn-register').addClass('active');
	} else {
		$('button.btn-register').removeClass('active');
	}
});
// 点击获取验证码
$('button.get-code').click(function() {
	http({
		method: 'post',
		url: '/register/getcode',
	}).then(function(result) {
		console.log(result);
		$('button.get-code').text(result);
	});
});
// 点击注册
$('button.btn-register').click(function() {
	http({
		method: 'post',
		url: '/register/getregister',
		data: {
			name: $('input.name').val(),
			phone: $('input.phone').val(),
			pwd: $('input.pwd').val(),
			code: $('input.code').val()
		}
	}).then(function() {
		alert('注册成功');
		setTimeout(function() {
			window.location.href = '/login/index.html';
		}, 500);
	});
	
});
// 点击眼睛
$('.content>form>span.ear').click(function() {
	// $('input.pwd').attr('type','text');
	// console.log($('input.pwd').attr('type'));
	if($('input.pwd').attr('type') == 'password') {
		$('input.pwd').attr('type','text');
	} else {
		$('input.pwd').attr('type','password');
	}
});
