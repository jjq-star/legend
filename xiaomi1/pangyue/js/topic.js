$(function() {
	// 复制页头
	// fizhi
	//header
	//字体变化
	$(".header .container .clearfix>li").hover(function() {
		$(this).find("a").css("color", "white");
	}, function() {
		$(this).find("a").css("color", "#b0b0b0");
	});
	// 下载小米
	$(".header .container .left>ul>li:nth-child(11)").hover(function() {
		$(this).find(".app").css("display", "block");
	}, function() {
		$(this).find(".app").css("display", "none");
	})
	//购物车变化
	$(".header .container .right").hover(function() {
		$(this).css("background-color", "white");
		$(this).find("span").css("color", "#FF6700");
		$(this).find(".xiala").stop().slideDown();
	}, function() {
		$(this).css("background-color", "#424242");
		$(this).find("span").css("color", "#b0b0b0");
		$(this).find(".xiala").stop().slideUp();
	});
	//menu
	//字体变化
	$(".menu .container .neirong>ul>li").hover(function() {

		$(this).find(".tl").css("color", "#FF6700");
		// $(this).find(".menu-nav0").css("display","block");
		$(this).find(".yincang").slideDown();
		$(this).find(".yincang").stop().css("border-top", "1px solid #ccc");
	}, function() {
		$(this).find(".tl").css("color", "#333");
		// $(this).find(".menu-nav0").css("display","none");
		$(this).find(".yincang").css("border-top", "1px solid white");
		$(this).find(".yincang").stop().slideUp();
	});
	//文本框内的变化
	$(".menu .container .search>form .mi>a").hover(function() {
		$(this).css({
			"background-color": "#FF6700",
			"color": "white"
		});
	}, function() {
		$(this).css({
			"background-color": "#eee",
			"color": "#757575"
		});
	});
	// 搜索框动画
	$(".menu .container .search>.search-button").hover(function() {
		console.log("aa");
		$(this).css("background-color", "#ff6700");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "black");
	});
	// 搜索框内的推荐
	$(".menu .container .search>.search-hot>a").hover(function() {
		$(this).css("background-color", "#ff6700");
		$(this).css("color", "white");
	}, function() {
		$(this).css("background-color", "#ccc");
		$(this).css("color", "black");
	})
	// 点击文本框(下拉推荐)
	$('.search>.search-text').focus(function() {
		$(this).parent().addClass('focus');
		$(this).next().css("display", "block");
	}).blur(function() {
		$(this).parent().removeClass('focus');
		$(this).next().css("display", "none");
	});
	// 下拉推荐的动画
	$(".menu .container .search .search-commend>ul>li").hover(function() {
		$(this).css("background-color", "#e0e0e0");
	}, function() {
		$(this).css("background-color", "white");
	});
	// fuzhi
	// 复制页头
	// 导航定位动画
	/* var wdth = window.innerWidth;
	var heig = window.innerHeight;
	if (heig > 800) {
		$(".topic-header").css({
			"position": "fixed",
			"top":"0",
			"left":"0",
            "z-index":"100"
		})
	}
 */
	$(window).scroll(function() {
		var t = $(document).scrollTop();
		//console.log(t);
		if (t > 200) {
			$(".topic-header2").css({
				//"display": "block",
				"position": "fixed",
				"top": "0",
				"left": "0",
				"z-index": "100"
			}).slideDown()
		}
		if (t < 150) {
			$(".topic-header2").css({
				//"display": "none",
				"position": "fixed",
				"top": "0",
				"left": "0",
				"z-index": "100"
			}).slideUp()
		}
	});
	// lijigoumaidonghua
	$(".topic-header").find("button").hover(function() {
			$(this).css({
				"background-color": "#F25807",
			})
		},
		function() {
			$(this).css({
				"background-color": "#FF6700",
			})
		}
	)

	$(".topic-header2").find("button").hover(function() {
			$(this).css({
				"background-color": "#F25807",
			})
		},
		function() {
			$(this).css({
				"background-color": "#FF6700",
			})
		}
	)

	// console.log($(".topic-header").find("button").length)
	//lunbo1
	var mySwiper = new Swiper('.swiper-container1', {
		// direction: 'vertical', // 垂直切换选项
		loop: true, // 循环模式选项
		autoplay: true, //自动切换
		slidesPerView: "auto", //一页显示多个
		//danchu
		effect: 'fade',

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
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	})
	//lunbo2
	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', // 垂直切换选项
		loop: true, // 循环模式选项
		autoplay: true, //自动切换
		slidesPerView: "auto", //一页显示多个
		//danchu
		//effect : 'fade',

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
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	})
	// qiloudonghua
	$(".topic-floor7 .container .floor7-zixia").find("div").on("click", function() {
		$(this).siblings().css({
			"border": "1px solid #00A0E9",
			"color": "#00A0E9",
			"background-color": "#FFFFFF"

		})
		$(this).css({
			"border": "1px solid #F15757",
			"color": "#F15757",
			"background-color": "#FDE7E7"
		})
		var xiabiao = $(this).index();
		$(this).parent().prev(".floor7-vido1").find("video").css({
			"display": "none",
		})

		$(this).parent().prev(".floor7-vido1").find("video").eq(xiabiao).css({
			"display": "block",
		})

	})
	new WOW().init();
	// 超链接动画
	$(".header .left a").attr("href", "index.html")
	var random = parseInt(Math.random() * 2) + 1;
	if (random == 1) {
		$(".menu a").attr("href", "type1.html");
	} else {
		$(".menu a").attr("href", "type1.html");
	};
    $(".topic-header a").attr("href", "details1.html")
    $(".topic-header2 a").attr("href", "details1.html")	


// 右拉菜单动画
	$(".all .left>ul>li").hover(function() {
		$(this).css("background-color", "#FF6700");
		$(this).children("a").css("color", "#fff");
		var a = $(this).index();
		var b = $(".youla");
		b.eq(a).css("display", "block");
	}, function() {
		$(this).css("background-color", "#fff");
		$(this).children("a").css("color", "#666");
		var a = $(this).index();
		var b = $(".youla");
		b.eq(a).css("display", "none");
	});


	//鼠标滑过出现菜单
	$(".menu .container .neirong .all>div").hover(function() {
		console.log("dddd");
		// $(this).next(".left").stop().fadeIn();
		$(this).find(".left").css("display","block");
	}, function() {
		// $(this).next(".left").stop().fadeOut(1000);
		$(this).find(".left").css("display","none");
		
	});

})
