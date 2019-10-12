$(function() {
	//wow动画
	new WOW().init();

	$(".head .container .menu>ul>li>dl").css("display", "none");
	$(".head .container .menu>ul>li").hover(function() { //鼠标滑过
		$(this).find("dl").stop().slideDown();
	}, function() { //鼠标离开
		$(this).find("dl").stop().slideUp();
	});




	//二楼动画
	var a = $(".floor2 .container .picture .cover").parent();
	$(".floor2 .container .picture .cover").css("display", "none");
	a.hover(function() {
		// console.log($(this).find(".cover"));
		$(this).find(".cover").stop().fadeOut();
		a.find(".cover").not($(this).find(".cover")).stop().fadeIn();
	}, function() {
		a.find(".cover").stop().fadeOut();
	});
	//三楼动画
	var b = $(".floor3 .container .cover").parent();
	b.hover(function() {
		$(this).find(".cover").stop().fadeOut();
	}, function() {
		$(this).find(".cover").stop().fadeIn();
	});
	var now = new Date();
	var day = now.getDate();
	$(".floor3 .container .cover").text(day).css("font-size", "40px");
	//一楼动画
	var c = $(".floor1 .container .picture .cover").parent();
	// $(".floor1 .container .picture .cover").css("display",);
	console.log(c);
	c.hover(function() {
		console.log("aaa");
		$(this).find(".cover").stop().animate({
			height: 0,
		}, 200)

	}, function() {
		$(this).find(".cover").stop().animate({
			height: "100%",
		}, 200)

	});
	var m = null;
	$(".back").click(function() {
		// console.log(a);
		if (m == null) {
			$("html,body").stop().animate({
				scrollTop: 0,
				// $(".back").css("transform",rotateZ(180deg));
			});
			m = 1;
		} else {
			console.log("aa");
			// $(".back").prop("data",0);
			$("html,body").stop().animate({
				scrollTop: "1900px"
			}, 300);
			m = null;
		}
	});
	$(window).scroll(function() {
		var t = $(document).scrollTop();
		console.log(t);
	});


	//轮播js
	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', // 垂直切换选项
		loop: true, // 循环模式选项

		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
		},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// 如果需要滚动条
		// scrollbar: {
		//   el: '.swiper-scrollbar',
		// },
	})

});
