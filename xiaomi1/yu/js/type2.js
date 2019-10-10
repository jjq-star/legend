$(function() {
	//轮播
	var mySwiper = new Swiper('.swiper-container', {
		// direction: 'vertical', // 垂直切换选项
		loop: true, // 循环模式选项

		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// 如果需要前进后退按钮
		/* navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		}, */

		// 如果需要滚动条
		/* scrollbar: {
		  el: '.swiper-scrollbar',
		}, */
	});

	// 分页器颜色
	var $fen = $(".swiper-pagination");
	$fen.click(function() {
		$(".swiper-pagination-bullet-active").css({
			"border": "2px solid #FF6600",
			"background-color": "#F5F5F5"
		});
	});

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
	
	
	//地址选中，内容更改
	console.log($(".little-menu .address .dizhi").text())
	$(".little-menu .address .alert select").click(function(){
		var a=$(this).index();
		if(a==2){
			var b=$(".little-menu .address .alert select").eq(0).val();
			var c=$(this).prev().val();
			$(".little-menu .address .dizhi").text(b + c);
		}
	});
	


	//鼠标滑过出现菜单
	$(".menu .container .neirong .all>div").hover(function() {
		console.log("dddd");
		// $(this).next(".left").stop().fadeIn();
		$(this).find(".left").css("display", "block");
	}, function() {
		// $(this).next(".left").stop().fadeOut(1000);
		$(this).find(".left").css("display", "none");

	});
	/* $(".menu .container .neirong .all .xinjia .left").hover(function() {
		$(this).css("display", "block");
	}, function() {
		$(".menu .container .neirong .all .xinjia .left").css("display", "none");
	}); */

	//分类中的点击事件
	$(".type ul li:gt(1)").click(function() {
		var index = $(this).index();
		console.log(index);
		$(".floor1 .container>div:not(:eq(" + (index - 2) + "))").css({
			"display": "none"
		});
		$(".floor1 .container>div:eq(" + (index - 2) + ")").css({
			"display": "block"
		});
		$(".floor1 .container").css({
			"display": "block"
		});
		$(".floor2 .container>div:not(:eq(" + (index - 2) + "))").css({
			"display": "none"
		});
		$(".floor2 .container>div:eq(" + (index - 2) + ")").css({
			"display": "block"
		});
	});
	$(".type ul li:eq(1)").click(function() {
		$(".floor1 .container>div").css({
			"display": "block"
		});
		$(".floor1 .container").css({
			"display": "flex"
		});
	});

	//一楼div，滑过有阴影
	$(".floor1 .container>div").hover(function() {
		$(this).css("box-shadow", "#999 0 5px 10px");
	}, function() {
		$(this).css("box-shadow", "none");
	});

	//鼠标滑过小图片，边框颜色改变
	$(".floor1 .bt .new").hover(function() {
		$(this).css("border-color", "#ff6700");
	}, function() {
		$(this).css("border-color", "#ccc");
	});

	//切换不同颜色的图片，切换文字
	console.log($(".floor1 .container>div:eq(2) .bt .new").length);
	var $a = $(".floor1 .container>div:eq(2) .bt .new");
	$a.hover(function() {
		var index = $(this).index();
		// console.log(index);
		var a = $(".floor1 .container>div:eq(2) .tp").find("img:eq(" + (index - 2) + ")");
		// console.log(index-2);
		// console.log(a.length);
		$(this).css("border", "1px solid #FF6600");
		$a.not($(this)).css("border", "1px solid #ccc");
		$(".floor1 .container>div:eq(2) .tp").find("img:eq(" + (index - 2) + ")").css("display", "block");
		$(".floor1 .container>div:eq(2) .tp").find("img:not(:eq(" + (index - 2) + "))").css("display", "none");
		if (index == 2) {
			$(".floor1 .container>div:eq(2) .bt p:eq(0)").text("悦米机械键盘Pro静音版 白色");
		} else if (index == 3) {
			$(".floor1 .container>div:eq(2) .bt p:eq(0)").text("悦米机械键盘Pro静音版 黑色");
		}
	}, function() {
		$(this).css("border", "1px solid #FF6600");
	});

	//三楼滑过有加入购物车标志
	$(".floor3 .bt .swiper-slide>div").hover(function() {
		$(this).find(".bottom>p:eq(2)").css("display", "none");
		$(this).find(".bottom>div").css("display", "block");
	}, function() {
		$(this).find(".bottom>p:eq(2)").css("display", "block");
		$(this).find(".bottom>div").css("display", "none");
	});

	//鼠标滑过，出现地址插件
	$(".little-menu .address").hover(function() {
		$(this).find(".alert").css("display", "block");
	}, function() {
		$(this).find(".alert").css("display", "none");
	});
	//鼠标滑过，购物插件上方的字改变颜色，方框变成黄色
	$(".little-menu .change").hover(function() {
		$(this).not(".fang").css("color", "#ff6700");
	}, function() {
		$(this).not(".fang").css("color", "#424242");
	});
	$(".little-menu .change").click(function() {
		var a = $(this).hasClass("fang");
		var b = $(this).hasClass("color");
		if (a) { //如果有fang
			console.log("111");
			if (b) { //如果有color
				$(this).removeClass("color");
			} else { //如果没有color
				$(this).addClass("color");
			}
		} else { //如果没有fang
			console.log("444");
			if (b) { //如果有color
				$(this).next().removeClass("color");
			} else { //如果没有color
				$(this).next().addClass("color");
			}
		}

	});


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
		$(this).find(".yincang").slideDown();
		$(this).find(".yincang").stop().css("border-top", "1px solid #ccc");
	}, function() {
		$(this).find(".tl").css("color", "#333");
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
	$(".rightbar>ul>li>a>span").hover(function() {
		$(this).css("color", "#ff6700");
	}, function() {
		$(this).css("color", "#757575");
	})

	// 页脚动画
	$(".footer .footer-top .container .links .tel>a").hover(function() {
		$(this).css("background-color", "#ff6700");
		$(this).css("color", "white");
		$(this).children().css("color", "white");
	}, function() {
		$(this).css("background-color", "white");
		$(this).css("color", "#ff6700");
		$(this).children().css("color", "#ff6700");
	})
	// 添加超链接
	$(".header .left a").attr("href", "index.html")
	var random = parseInt(Math.random() * 2) + 1;
	if (random == 1) {
		$(".menu a").not(".menu .neirong .all>div").attr("href", "type1.html");
	} else {
		$(".menu a").not(".menu .neirong .all>div").attr("href", "type1.html");
	};
	
	
	$(".floor1 .container>div").click(function(){
		window.location="details2.html";
	});
	$(".floor3 .swiper-slide").click(function(){
		window.location="details2.html";
	});
	
	$(".header .center ul li:eq(0) a").click(function(){
		$(this).attr("href","login.html");
	});
	$(".header .center ul li:eq(1) a").click(function(){
		$(this).attr("href","register.html");
	});
});
