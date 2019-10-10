$(function(){
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
	$(".menu .container .search>.search-button").hover(function(){
		console.log("aa");
		$(this).css("background-color","#ff6700");
		$(this).css("color","white");
	},function(){
		$(this).css("background-color","white");
		$(this).css("color","black");
	});
	// 搜索框内的推荐
	$(".menu .container .search>.search-hot>a").hover(function(){
		$(this).css("background-color","#ff6700");
		$(this).css("color","white");
	},function(){
		$(this).css("background-color","#ccc");
		$(this).css("color","black");
	})
	// 点击文本框(下拉推荐)
	$('.search>.search-text').focus(function() {
		$(this).parent().addClass('focus');
		$(this).next().css("display","block");
	}).blur(function() {
		$(this).parent().removeClass('focus');
		$(this).next().css("display","none");
	});
	// 下拉推荐的动画
	$(".menu .container .search .search-commend>ul>li").hover(function(){
		$(this).css("background-color","#e0e0e0");
	},function(){
		$(this).css("background-color","white");
	});
	// fuzhi
	
	
	// cookie
	// 超链接
	$(".header .left a").attr("href","index.html")
	var random = parseInt(Math.random() * 2) + 1;
	if (random == 1) {
		$(".menu a").attr("href", "type1.html");
	} else {
		$(".menu a").attr("href", "type1.html");
	};
	
	
	
	
	
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