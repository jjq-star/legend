// 登录方式切换
$('.login-way span').click(function() {
	$(this).toggleClass('active').siblings().removeClass('active');
	$('.login-wrapper').toggleClass('active');
});
// 七天自动登录
$('.login-option>span>i').click(function() {
	$(this).toggleClass('active');
});
//登录按钮
$('.account input').on('input propertychange',function(){
	if($('.input-account input').val() !== "" && $('.input-pwd input').val() !== ""){
		$(".btn-account").css('background-color','#FF464E');
	} else {
		$(".btn-account").css('background-color','#ddd');
	}
});
$('.phone input').on('input propertychange',function(){
	if($('.input-phone input').val() !== "" && $('.input-code input').val() !== ""){
		$(".btn-code").css('background-color','#FF464E');
	} else {
		$(".btn-code").css('background-color','#ddd');
	}
});
// 密码登录,保存到 token
$('.btn-account').click(function() {
	$.ajax({
		method: 'post',
		url: '/user/login/pwd',
		data: {
			name: $(".name").val(),
			pwd: $(".pwd").val()
		},
		dataType: 'json',
		success: function(result){
			if(result.status === 200){
				sessionStorage.setItem('token', result.data);
				var url = document.referrer;
				var arr = ['register'];
				var i = url.indexOf(arr[0]);
				if(i !== -1) {
					window.location.href = '/home/index.html';
				} else {
					window.history.back();
				}
			} else {
				alert(result.message);
			}
		}
	});
});
// 获取验证码
$('.input-code>span.code').click(function() {
	$.ajax({
		method: 'get',
		url: '/user/login/code',
		success: function(result){
			if(result.status === 200){
				$('.input-code>span.code').text(result.data);
			}
		}
	})
});

// 手机登录
$('.btn-code').click(function() {
	$.ajax({
		method: 'post',
		url: '/user/login/phone',
		data: {
			phone: $('.phones').val(),
			code: $('.input-code>input').val()
		},
		success: function(result) {
			if(result.status === 200) {
				alert('登陆成功');
			} else {
				alert(result.message);
			}
		}
	})
});
