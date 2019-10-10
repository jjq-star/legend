$(function() {
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
	$(".header .container .right").click(function(){
		window.location = "shopping.html"
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
	// 右侧菜单变化
	$(".rightbar>ul>li").hover(function() {
		$(this).children().children(".iconfont").css("color", "#ff6700");
		$(this).children(".left").css("display", "block");
	}, function() {
		$(this).children().children(".iconfont").css("color", "#757575");
		$(this).children(".left").css("display", "none");
	})
	//banner轮播图
	var mySwiper = new Swiper('.banner .container .right .swiper-container', {
		loop: true, // 循环模式选项

		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: true,
	});
	// 轮播图动画
	$(".banner .container .right .swiper-container .swiper-button-prev").hover(function() {
		$(this).css({
			"background-color": "rgba(0,0,0,0.5)",
		})
	}, function() {
		$(this).css({
			"background-color": "rgba(200,200,200,0)",
		})
	});
	$(".banner .container .right .swiper-container .swiper-button-next").hover(function() {
		$(this).css({
			"background-color": "rgba(0,0,0,0.5)",
		})
	}, function() {
		$(this).css({
			"background-color": "rgba(200,200,200,0)",
		})
	});
	// 右拉菜单动画
	$(".banner .container .left>ul>li").hover(function() {
		$(this).css("background-color", "#FF6700");
		var a = $(this).index();
		var b = $(".youla");
		b.eq(a).css("display", "block");
	}, function() {
		$(this).css("background-color", "#55585A");
		var a = $(this).index();
		var b = $(".youla");
		b.eq(a).css("display", "none");
	});
	//获得当前宽度
	$(window).resize(function(){
		// var wdth = window.innerWidth;
		var $wdth = $(window).width();
		console.log($wdth);
		if($wdth < 948){
			
		}else if($wdth > 948){
			
		};
	});
	//上浮动画
	$(".floor3 .container .content .lft").hover(function() {
		$(this).stop().animate({
			"marginTop": "-5px",
		}, 100);
	}, function() {
		$(this).stop().animate({
			"marginTop": "0px",
		}, 100);
	});
	$(".floor1 .container .left .item").hover(function() {
		$(this).children().css("color", "white");
	}, function() {
		$(this).children().css("color", "rgba(255, 255, 255, 0.7)");
	});

	$(".item").hover(function() {
		$(this).stop().animate({
			"marginTop": "-5px",
		}, 100);
	}, function() {
		$(this).stop().animate({
			"marginTop": "0px",
		}, 100);
	});
	// 三楼动画
	$(".floor3 .container .title .all>a").hover(function() {
		$(this).css("color", "#ff6700");
	}, function() {
		$(this).css("color", "#333");
	});
	// 五楼动画
	$(".repeat-fl1 .container .title .right>ul>li>a").hover(function() {
		$(".repeat-fl1 .container .title .right>ul>li>a").removeClass("text-block");
		$(this).addClass("text-block");
		$(".repeat-fl1 .container .title .right>ul>li .xian").removeClass("xian-block");
		$(this).next(".xian").addClass("xian-block");
	}, function() {});
	$(".repeat-fl1 .container .content .item").hover(function() {
		$(this).children(".fl5-review").css({
			"transform": "translateY(-60px)",
			"transition": "all 0.5s"
		})
	}, function() {
		$(this).children(".fl5-review").css({
			"transform": "translateY(0px)",
			"transition": "all 0.5s"
		})
	})
	// 十五楼轮播图
	var mySwiper = new Swiper('.floor15 .container .swiper-container', {
		loop: false, // 循环模式选项
		slidesPerView: 5,
		spaceBetween: 15,
		slidesPerGroup: 5,

		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: false,
	});
	$(".floor15 .container .swiper-container .swiper").removeClass("swiper-button-disabled");
	$(".floor15 .container .swiper-container").hover(function() {
		$(this).find(".swiper").children("span").css("opacity", "1");
	}, function() {
		$(this).find(".swiper").children("span").css("opacity", "0");
	})
	// 十七楼轮播
	var mySwiper = new Swiper('.floor17 .container .content .swiper-container', {
		loop: false, // 循环模式选项
		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: false,

	})
	$(".floor17 .container .swiper-container").hover(function() {
		$(this).find(".swiper").children("span").css("opacity", "1");
	}, function() {
		$(this).find(".swiper").children("span").css("opacity", "0");
	})
	// 十八楼视频
	var myPlayer1 = videojs('my-video1');
	videojs("my-video1").ready(function() {
		var myPlayer = this;
		myPlayer.play();
	});
	var myPlayer2 = videojs('my-video2');
	videojs("my-video2").ready(function() {
		var myPlayer = this;
		myPlayer.play();
	});
	var myPlayer3 = videojs('my-video3');
	videojs("my-video3").ready(function() {
		var myPlayer = this;
		myPlayer.play();
	});
	var myPlayer4 = videojs('my-video4');
	videojs("my-video4").ready(function() {
		var myPlayer = this;
		myPlayer.play();
	});
	// 页脚动画
	$(".footer .footer-top .container .links .tel>a").hover(function() {
		$(this).css("background-color", "#ff6700");
		$(this).css("color", "white");
		$(this).children().css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "#ff6700");
		$(this).children().css("color", "#ff6700");
	});

});
