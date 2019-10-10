$(function(){
	// 国家选择
	$(".text-input .country-select>input").focus(function(){
		$(".text-input .countrys").css("display","block");
	}).blur(function(){
		// $(".text-input .countrys").css("display","none");
		
	});
	$(".text-input .countrys>ul>li:not(:first-child)").click(function(){
		$(".text-input .country-select .country-acquiesce").text($(this).children().text());
		// console.log($(this).children().text());
		$(".text-input .countrys").css("display","none");
	});
	// 号码选择
	$(".phone-input>input").focus(function(){
		$(".phone-input .phones").css("display","block");
	}).blur(function(){
		// $(".text-input .countrys").css("display","none");
		
	});
	$(".phone-input .phones>ul>li:not(:first-child)").click(function(){
		$(".phone-input .phone-select").text($(this).children("span").text());
		// console.log($(this).children().text());
		$(".phone-input .phones").css("display","none");
	});
	
	
	
	$(".text-input .countrys>ul>li:not(:first-child)").hover(function(){
		$(this).css("background-color","#e0e0e0");
		// console.log($(this).children().text());
	},function(){
		$(this).css("background-color","white")
	})
	// 立即注册
	$(".register>input").click(function(){
		// 获取到输入手机号的文本框
		var $input =parseFloat($(".phone-input .phone-right>input").val()) ;
		var reg = /^1[3456789]\d{9}$/;
		if(reg.test($(".phone-input .phone-right>input").val())){
			console.log($input);
			$(".phone-input .phone-wrong").css("display","none");
		}else{
			console.log("错误");
			$(".phone-input .phone-wrong").css("display","block");
		};
		if($(".treaty>span").hasClass("click")){
			$(".phone-input .treaty-wrong").css("display","none");
		}else{
			$(".phone-input .treaty-wrong").css("display","block");
		}
		
		
	});
	//用户协议
	$(".treaty .iconfont").click(function(){
		var a =$(".treaty>span").hasClass("click");
		if(a){
			$(".treaty>span").removeClass("click");
		}else{
			$(".treaty>span").addClass("click");
		}
	})
	
	
	
	
	
});