$(function() {
	var $shopStr = document.cookie;
	// console.log($shopStr);
	var Name1 =cooKie("name1");
	$(".box2 .content .one-select .product>ul #product1-name").text(Name1);
	var Price1 =cooKie("price1");
	// console.log(Price1)
	$(".box2 .content .one-select .product>ul #product1-price").text(Price1);
	var Count1 =cooKie("count1");
	$(".box2 .content .one-select .product>ul #product1-number").text(Count1);
	var Xiaoji1 =cooKie("price1");
	$(".box2 .content .one-select .product>ul #product1-xiaoji").text(Xiaoji1);
	var Photo1 = cooKie("photo1");
	console.log(Photo1);
	var Name2 =cooKie("name2");
	// console.log(Name2)
	$(".box2 .content .one-select .product>ul #product2-name").text(Name2);
	
	var Price2 =cooKie("price2");
	$(".box2 .content .one-select .product>ul #product2-price").text(Price2);
	
	var Count2 =cooKie("count2");
	$(".box2 .content .one-select .product>ul #product2-number").text(Count2);
	
	var Xiaoji2 =cooKie("price2");
	$(".box2 .content .one-select .product>ul #product2-xiaoji").text(Xiaoji2);
	
	if(Name1 == null && Name2 == null){
		$(".box2").css("display","none");
		$(".box").css("display","block");
	}else{
		$(".box2").css("display","block");
		$(".box").css("display","none");
		if(Name1 != null){
			$(".box2 .content .one-select .product>ul:eq(0)").css("display","block");
		}else (Name1 == null){
			$(".box2 .content .one-select .product>ul:eq(0)").css("display","none");
		}
		if(Name2 != null){
			$(".box2 .content .one-select .product>ul:eq(1)").css("display","block");
		}else if(Name2 == null){
			$(".box2 .content .one-select .product>ul:eq(1)").css("display","none");
		}
	}
	// 获取到所有的ul
	var a = $(".one-select .product>ul").find("li:eq(2)");
	console.log(a.parent());
	if (a.eq(0).text().length > 0) {
		a.parent().eq(0).css("display", "block");
	} else {
		a.parent().eq(0).css("display", "none");
	}
	// 单选按钮
	$(".box2 .content .one-select .product>ul>li>input").click(function() {
		if ($(this).prop("checked")) {
			// console.log($(this).parent().nextAll().eq(2).text());
			// $(".total>span").text($(this).parent().nextAll().eq(2).text());
			total();
		} else {
			// $(".total>span").text("");
			total();
		}

	});

	// 全选按钮
	$(".box2 .content .both-select>ul>li>input").click(function() {
		// console.log("aaa");
		$(this).css("background-color", "#ff6700");
		//获取到所有的 复选框
		var $checks = $("input");
		var a = $(this).prop("checked");
		if (a) {
			$checks.attr("checked", "checked");
		} else {
			$checks.removeAttr("checked", "checked");
		}
		// $checks.attr("checked","checked");
		total();

	});
	// 删除操作
	$(".box2 .content .one-select .product>ul .product-delet").hover(function() {
		$(this).css("cursor", "pointer");
	})
	$(".box2 .content .one-select .product>ul .product-delet").click(function() {
		console.log($(this).parent());
		$(this).parent().css("display", "none");

	})
	// 去结算
	$(".box2 .content .total>input").click(function(){
		window.location = "user.html"
	})

	
	


	//三楼滑过有加入购物车标志
	$(".floor3 .bt .swiper-slide>div").hover(function() {
		$(this).find(".bottom>p:eq(2)").css("display", "none");
		$(this).find(".bottom>div").css("display", "block");
	}, function() {
		$(this).find(".bottom>p:eq(2)").css("display", "block");
		$(this).find(".bottom>div").css("display", "none");
	});
});

function total() {
	var $total = 0;
	var $checks = $(".btn");
	//console.log($checks);
	$checks.each(function(idx, item) {
		var b = $(item).prop("checked");
		if (b) {
			var $number = $(".product").find("ul>li:eq(3)").text();
			var $newNumber = parseFloat($number);
			// console.log($newNumber);
			console.log($(this).parent().nextAll().eq(2).text());
			var c = $(this).parent().nextAll().eq(2).text();
			if (c == "") {

			} else {
				$total += parseFloat($(this).parent().nextAll().eq(2).text());
			}
		};
		$(".total>span").text($total);
	})
}
// cookie 函数
function cooKie(key){
	var strs = document.cookie.split(";");
	strs.pop();
	strs.pop();
	for(var i =0;i<strs.length;i++){
		var newstr = strs[i].split("=");
		var keys = newstr[0];
		if(keys && keys.trim() == key){
			return newstr[1];
		}
	}
	return null;
}