$(function() {
	//账号登录和扫码登录切换
	var $a = $(".banner .container .pick span");
	// console.log($a.length);
	$a.click(function() {
		$(this).css("color", "#FF6700");
		$a.not($(this)).css("color", "#666");
		var index = $(this).index();
		$(".banner .container .btm>div:eq(" + index + ")").css("display", "block");
		$(".banner .container .btm>div:not(:eq(" + index + "))").css("display", "none");
	});

	var $button = $(".banner .btm .text-box3 .button").click(function() {
		var $text1 = $(".banner .btm .text-box1>input").val();
		var $text2 = $(".banner .btm .text-box2>input").val();
		var $point = $(".banner .btm .login-point");
		console.log($text2);
		console.log($text1);
		// 登录点击事件
		var a = /^\w+@\w+\.\w+$/;
		var b = /^[0-9]{10}$/;
		var c = /^1[1-9]{10}$/;
		var d = /^\w{6,16}$/;
		if ($text1 == "") {
			console.log("1111111");
			$point.eq(0).css("display", "block");
			$point.eq(1).css("display", "none");
		} else {
			if ($text2 == "") {
				$point.eq(1).css("display", "block");
				$point.eq(0).css("display", "none");

			} else {
				$point.eq(1).css("display", "none");
				$point.eq(0).css("display", "none");
				if (a.test($text1) || b.test($text1) || c.test($text1)) {
					console.log("aaaa");
				} else {
					$point.eq(2).css("display", "block");
					$point.not(":eq(2)").css("display", "none");
					console.log("aaaa");
				};
				if (!d.test($text2)) {
					$point.eq(3).css("display", "block");
					$point.not(":eq(3)").css("display", "none");
					console.log("bbb");
				} else {
					alert("登录成功");
				}
			}
		}
	});
});
