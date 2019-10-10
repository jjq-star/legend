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
	$(".body-right .body-box").hover(

		function() {
			//console.log("dd")
			$(this).css({
				"border": "1px solid #757575",
				"translation": "all 1s",
				"cursor": "pointer"
			});
			// console.log($(this).children(".box-cricle"));
			$(this).children(".box-cricle").css({
				"background-color": "#757575",
				"translation": "all 1s"
			})
			$(this).children("p").css({
				"color": "#757575",
				"translation": "all 1s"
			})
		},
		function() {
			//console.log("gg")
			$(this).css({
				"border": "1px solid #E0E0E0",
				"translation": "all 1s"
			});
			$(this).children(".box-cricle").css({
				"background-color": "#E0E0E0",
				"translation": "all 1s"
			})
			$(this).children("p").css({
				"color": "#E0E0E0",
				"translation": "all 1s"
			})

		}
	)
	// 地址打开动画
	$(".body-right .body-box").on("click", function() {
		$(".address-heimu").fadeIn(500);
		$(".heimu-b").animate({
			top: "70px",
		}, 600)
	})
	// 地址关闭动画
	$(".b-footer>button").eq(1).on("click", function() {
		$(".heimu-b").animate({
			top: "-600px",
		})
		$(".address-heimu").fadeOut(1000);
	})
	$(".b-header>div").on("click", function() {
		$(".heimu-b").animate({
			top: "-600px",
		})
		$(".address-heimu").fadeOut(1000);
	})

	// 表单内容动画
	$(".b-body>form").children().not("span").not(".select").on("click", function() {
		$(this).css({
			"border": "1px solid #ff6700",
		})
		$(".b-body>form").children().not($(this)).not("span").css({
			"border": "1px solid #A9A9A9",
		})
		// span动画
		var x = $(this).index();
		var xiabiao = x + 6;
		var zhe = $(".b-body>form").children().eq(xiabiao);
		//var na = $(".b-body>form").children("span").not(zhe);
		if (x == 0 || x == 1) {
			var na = $(".b-body>form").children(".h").not(zhe);
			console.log(na.length)
			zhe.css({
				"text-align": "center"
			})
			zhe.animate({
				top: "-5px",
				fontSize: "10px",
				width: "40px"
			});

			na.css({
				"text-align": "left"
			});
			na.animate({
				top: "13px",
				fontSize: "14px",
				width: "100px"
			});
			var $xiang = $(".b-body>form .s4");
			$xiang.css({
				"text-align": "left"
			})
			$xiang.animate({
				top: "120px",
				fontSize: "14px",
				width: "200px"
			})
			var na2 = $(".b-body>form").children(".g").not(zhe);
			na2.css({
				"text-align": "left"
			});
			na2.animate({
				top: "240px",
				fontSize: "14px",
				width: "150px"
			});



		}
		if (x == 2) {
			var na = $(".b-body>form").children(".h")
			na.css({
				"text-align": "left"
			});
			na.animate({
				top: "13px",
				fontSize: "14px",
				width: "100px"
			});
			var $xiang = $(".b-body>form .s4");
			$xiang.css({
				"text-align": "left"
			})
			$xiang.animate({
				top: "120px",
				fontSize: "14px",
				width: "200px"
			});
			var na2 = $(".b-body>form").children(".g");
			na2.css({
				"text-align": "left"
			});
			na2.animate({
				top: "240px",
				fontSize: "14px",
				width: "150px"
			});
		}
		if (x == 3) {
			var na = $(".b-body>form").children(".h")
			zhe.css({
				"text-align": "center"
			})
			zhe.animate({
				top: "102px",
				fontSize: "10px",
				width: "50px"
			});

			na.css({
				"text-align": "left"
			});
			na.animate({
				top: "13px",
				fontSize: "14px",
				width: "100px"
			});
			var na2 = $(".b-body>form").children(".g");
			na2.css({
				"text-align": "left"
			});
			na2.animate({
				top: "240px",
				fontSize: "14px",
				width: "150px"
			});

		}
		if (x == 4 || x == 5) {
			zhe.css({
				"text-align": "center"
			})
			zhe.animate({
				top: "225px",
				fontSize: "10px",
				width: "50px"
			});
			var na = $(".b-body>form").children(".h")
			na.css({
				"text-align": "left"
			});
			na.animate({
				top: "13px",
				fontSize: "14px",
				width: "100px"
			});
			var $xiang = $(".b-body>form .s4");
			$xiang.css({
				"text-align": "left"
			})
			$xiang.animate({
				top: "120px",
				fontSize: "14px",
				width: "200px"
			})
			var na2 = $(".b-body>form").children(".g").not(zhe);

			na2.css({
				"text-align": "left"
			});
			na2.animate({
				top: "240px",
				fontSize: "14px",
				width: "150px"
			});

		}

	})
	// 地址插件动画
	$(".b-body .chajian").on("click", function() {
		$(".b-body .select").addClass("dakan")

	})
	$(".b-body .select>div").on("click", function() {
		$(".b-body .select").removeClass("dakan")
	})


	// 超链接
	$(".header .left a").attr("href", "index.html")
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
		$(this).find(".left").css("display", "block");
	}, function() {
		// $(this).next(".left").stop().fadeOut(1000);
		$(this).find(".left").css("display", "none");

	});


	// 地址
	$(".b-body select").on("click", function() {
		var biao = $(this).index()

		
		if (biao == 3) {
			var a = $(".b-body select").eq(0).val();
			var b = $(this).prev().val();
			var c = $(this).val();
			$(".b-body .chajian").val( a+ b + c);
		}



	})



})
