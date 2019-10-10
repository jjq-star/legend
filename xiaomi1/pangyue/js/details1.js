$(function() {
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
	//监听滚动事件  定位动画
	$(window).scroll(function() {
		var h = $(document).scrollTop();
		//console.log(h);
		if (h > 1100) {
			$(".details-floor1 .floor1-left").removeClass("fixed")
			$(".details-floor1 .floor1-left").addClass("position")
		};
		if (h < 1100) {
			$(".details-floor1 .floor1-left").addClass("fixed")
			$(".details-floor1 .floor1-left").removeClass("position")
		}

	});
	//details-header动画
	$(window).scroll(function() {
		var t = $(document).scrollTop();
		//console.log(t);
		if (t > 200) {
			$(".details-header2").css({
				//"display": "block",
				"position": "fixed",
				"top": "0",
				"left": "0",
				"z-index": "100"
			}).slideDown()
		}
		if (t < 150) {
			$(".details-header2").css({
				//"display": "none",
				"position": "fixed",
				"top": "0",
				"left": "0",
				"z-index": "100"
			}).slideUp()
		}
	});
	//选择版本动画
	$(".right-banben .banben-dengfen>div").on("click", function() {
		$(this).siblings().css({
			"border": "1px solid #E0E0E0",
		})
		$(this).siblings().children(".d1").css({
			"color": "#333",
		})
		$(this).css({
			"border": "1px solid #ff6700",
		})
		$(this).children(".d1").css({
			"color": "#ff6700",
		})




		//价格传到下面

		var t = $(this).hasClass("click");
		if (t) {
			$(this).removeClass("click");


		} else {
			$(this).addClass("click");
			$(".right-banben .banben-dengfen>div").not($(this)).removeClass("click")
		}

		price();


	})





	// xuanzeyansedonghua
	$(".right-color .color-dengfen>div:lt(3)").on("click", function() {
		$(this).siblings(".chu").css({
			"border": "1px solid #E0E0E0",
		})
		$(this).siblings(".chu").children("span").css({
			"color": "#333",
		})


		$(this).css({
			"border": "1px solid #ff6700",
		})
		$(this).children("span").css({
			"color": "#ff6700",
		})
		//tupianbianhua
		var xiabiao = $(this).index()
		var a = $(".details-floor1 .container .floor1-left")
		a.eq(xiabiao).css({
			"display": "block"
		})
		a.eq(xiabiao).siblings().not(".floor1-right").css({
			"display": "none"
		})

	})
	$(".right-taocan .taocan-dengfen>div").on("click", function() {
		$(this).siblings().css({
			"border": "1px solid #E0E0E0",
		})
		$(this).siblings().css({
			"color": "#333",
		})
		$(this).css({
			"border": "1px solid #ff6700",
		})
		$(this).css({
			"color": "#ff6700",
		})
	})



	//yiwaibaihudonghua
	var b = $(".right-protect>div")
	b.on("click", function() {
		var a = $(this).hasClass("click");
		if (a) {
			$(this).removeClass("click")
		} else {
			$(this).addClass("click")
			b.not($(this)).removeClass("click")
		}
		price()
	})


	//yanchangdonghua
	$(".right-yanchang>div").on("click", function() {
		var a = $(this).hasClass("click");
		if (a) {
			$(this).removeClass("click")
		} else {
			$(this).addClass("click")
		}
		price()
	})




	// 27w快速套充
	$(".right-taocan .taocan-dengfen .p2").hover(function() {
			$(".right-taocan .taocan-dengfen .taocan-donghua").css({
				"display": "inline-block"
			});

		},
		function() {
			$(".right-taocan .taocan-dengfen .taocan-donghua").css({
				"display": "none"
			});
		}
	)
	// 总价计算

	$(".one").on("click", function() {
		/* var h = $(".totle").text();
		h = parseFloat(h); */
		price();
		
		
		
	})
	// 加入购物车
	$(".details-floor2 .container>div .shang .shop").click(function(){
		window.location = "shopping.html"
		// cookie操作
		var $name =$(".details-floor1 .container .floor1-right .right-wodr1").children("p").eq(0).text();
		var $price =$(".totle").text();
		var $count =1;
		var $photo = $("url(../img/details1/details1.jpg)");
		// console.log($photo);
		// var $str =[$name,$price,$count];
		// console.log($str);
		// document.cookie=$str;
		document.cookie="name1=" + $name+ ";" +"path=/";
		document.cookie="price1=" + $price+ ";" +"path=/";
		document.cookie="count1=" + $count+ ";" +"path=/";
		document.cookie="photo1=" + $photo+ ";" +"path=/";
		
		
	})
	


	//添加超链接
	$(".header .left a").attr("href","index.html")
	var random = parseInt(Math.random() * 2) + 1;
	if (random == 1) {
		$(".menu a").attr("href", "type1.html");
	} else {
		$(".menu a").attr("href", "type1.html");
	};
	
	$(".details-header a").attr("href", "topic.html")
	$(".details-header2 a").attr("href", "topic.html")	
	
	
	// fuzhij
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

function price() {
	var sums = 0;
	$(".one").each(function(idx, item) {

		var a = $(this).hasClass("click");
		if (a) {
			var b = $(this).find(".money").text();
			var b2 = parseFloat(b);
			console.log(b);
			sums += b2;
		}
		$(".totle").text(sums);
	})
}
