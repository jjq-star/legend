$(function() {
	
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
		$(this).find(".left").css("display", "block");
	}, function() {
		// $(this).next(".left").stop().fadeOut(1000);
		$(this).find(".left").css("display", "none");
	
	});

	//导航条和手机定位
	$(window).scroll(function() {
		var height = $(this).scrollTop();
		//导航条向下的动画
		if (height >= 200) {
			$(".little-header1").stop().slideDown(80);
		} else if (height <= 600) {
			$(".little-header1").stop().slideUp(80);
		}
		//手机固定定位
		if (height >= 1100) {
			$(".floor1 .left>div").removeClass("fixed").addClass("absolute");
		} else if (height < 1100) {
			$(".floor1 .left>div").removeClass("absolute").addClass("fixed");
		}
	});

	//div13点击事件，出现对号，出现边框
	var b = $(".floor1 .right .one:not(:eq(0))");
	// console.log(b.length);
	b.click(function() {
		var a = $(this).hasClass("click");
		if (a) {
			$(this).removeClass("click");
		} else {
			$(this).addClass("click");
			b.not($(this)).removeClass("click");
		}
		jisuan();
	});
	$(".floor1 .right .one:eq(0)").click(function() {
		var c = $(this).hasClass("click");
		if (c) {
			$(this).removeClass("click");
		} else {
			$(this).addClass("click");
		}
		jisuan();
	});

	//点击事件计算价格
	
	$(".floor1 .right .pic").click(function(){
		var a = $(this).hasClass("click");
		if (a) {
			$(this).removeClass("click");
		} else {
			$(this).addClass("click");
			$(".floor1 .right .pic").not($(this)).removeClass("click");
		}
		jisuan();
	});

	


	//改变图片,对选择版本进行点击
	var $pic = $(".floor1 .right .pic");
	var $img = $(".floor1 .left>div:lt(3)");
	var $imgs=$(".floor1 .left>div");
	// console.log($img.eq(2));
	// console.log($pic.length);
	// console.log($img.length);
	$pic.click(function() {
		$(this).css("border-color", "#ff6700");
		$pic.not($(this)).css("border-color", "#ccc");
		var index = $(this).index();
		// console.log(index);
		$img.eq(index).css("display", "block");
		console.log($img.eq(index));
		$img.not(":eq(" + index + ")").css("display", "none");
		$imgs.not($img.eq(index)).css("display", "none");
		//对选择版本进行点击，选择颜色发生改变
		var x=$(this).index();
		if(x==0 || x==2){
			$(".floor1 .right>div:eq(10)>div:eq(1)").css("display", "block");
			$(".floor1 .right>div:eq(10)>div:eq(0)").css("display", "none");
			$(".floor1 .right>div:eq(10)").css("height","150px");
		}else if(x==1){
			$(".floor1 .right>div:eq(10)>div:eq(1)").css("display", "none");
			$(".floor1 .right>div:eq(10)>div:eq(0)").css("display", "block");
			$(".floor1 .right>div:eq(10)").css("height","80px");
			var mySwiper = new Swiper('.swiper-container', {
				// direction: 'vertical', // 垂直切换选项
				loop: true, // 循环模式选项
				autoplay: true,
			
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
			
				// 如果需要滚动条
				// scrollbar: {
				// 	el: '.swiper-scrollbar',
				// },
			});
			
		}
	});
	
	//对选择颜色进行点击事件，图片颜色发生改变
	var $pic1=$(".floor1 .right .pic1");
	var $img1=$(".floor1 .left>div:gt(2)");
	// console.log($img1.eq(0));
	// console.log($pic1.length);
	$pic1.click(function(){
		console.log("aaa");
		var w=$(this).index();
		console.log($img1.eq(w));
		$img1.eq(w).css("display", "block");
		// $img1.not($(this)).css("display", "none");
		$imgs.not($img1.eq(w)).css("display", "none");
		var a = $(this).hasClass("click");
		if (a) {
			$(this).removeClass("click");
		} else {
			$(this).addClass("click");
			$(".floor1 .right .pic1").not($(this)).removeClass("click");
		}
	});
	
	
	// 页脚动画
	$(".footer .footer-top .container .links .tel>a").hover(function(){
		$(this).css("background-color","#ff6700");
		$(this).css("color","white");
		$(this).children().css("color","white");
	},function(){
		$(this).css("background-color","white");
		$(this).css("color","#ff6700");
		$(this).children().css("color","#ff6700");
	})
	
	
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
	// 右侧菜单变化
	$(".rightbar>ul>li>a>span").hover(function(){
		$(this).css("color","#ff6700");
	},function(){
		$(this).css("color","#757575");
	})
	// 加入购物车
	$("#drop").click(function(){
		window.location="shopping.html";
		// cookie操作
		var $name2 =$("#name1").text();
		var $price2 =$(".nums").text();
		var $count2 =1;
		// var $str1 =[$name1,$price1,$count1];
		// 
		// document.cookie=$str1;
		console.log(document.cookie);
		document.cookie="name2=" + $name2+ ";" +"path=/";
		document.cookie="price2=" + $price2+ ";" +"path=/";
		document.cookie="count2=" + $count2+ ";" +"path=/";
	})
	
	//超链接
	$(".header .left a").attr("href","index.html");
	var random = parseInt(Math.random() * 2) + 1;
	if (random == 1) {
		$(".menu a").not(".menu .neirong .all>div").attr("href", "type2.html");
	} else {
		$(".menu a").not(".menu .neirong .all>div").attr("href", "type2.html");
	};
	
	$(".header .center ul li:eq(0) a").click(function(){
		$(this).attr("href","login.html");
	});
	$(".header .center ul li:eq(1) a").click(function(){
		$(this).attr("href","register.html");
	});
	
	
});

function jisuan(){
	var num = 0;
	$(".floor1 .right .a").each(function(index, value) {
		var m = $(this).hasClass("click");
		// console.log(m);
		if (m) {
			var n = $(this).find(".price").text();
			n = parseFloat(n);
			// console.log(n);
			num += n;
		}
	});
	$(".floor1 .right .nums").text(num);
};