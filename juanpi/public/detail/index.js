// 点击切换头部下拉菜单
$('.header>button').click(function() {
	$(this).next().toggleClass('active');
});
var id = location.search.slice(1).split('=')[1];
console.log(location.search.slice(1));
var bannerScroll = null;
var time = null; //轮播图自动播放
var count = 1; //默认商品数量为1
var size = 'L';
// 获取数据
function getData() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/list/detail/' + id,
			success: function(result) {
				if (result.status === 200) {
					resolve(result.data)
				} else {
					alert(result.message);
				}
			}
		});
	});
}
// 获取商品数量并在购物车中显示
function getCount() {
	$.ajax({
		method: 'get',
		url: '/cart/getcount',
		headers: {'Authorization': sessionStorage.getItem('token')},
		success: function(result) {
			if(result.status === 200) {
				$('em.shopping-count').text(parseInt(result.data) || 0);
			}
		}
	});
}
// 展示数据
function showData(products) {
	//轮播图展示：
	var banner = products.bannerImages.split(',');
	// 最后一张图
	$(`<li><img src='${ banner[banner.length - 1] }' /></li>`).appendTo('.content ul');
	banner.forEach(function(item) {
		$(`
			<li>
				<img src='${ item }' />
			</li>
		`).appendTo('.content ul')
	})
	// 第一张图
	$(`<li><img src='${ banner[0] }' /></li>`).appendTo('.content ul');
	$('.content ul').css('width', `${ banner.length + 2}00%`);
	initBannerScroll();
	// 数据展示
	$('.content>.particular>em.price').text(`¥${ products.price }`);
	$('.content>.particular>span.sale').text(`${ products.sale}人已购买`);
	$('.content>.particular>h3.title').text(`${ products.name }`);
	$('.popup img').attr('src', `${ banner[1] }`);
	$('.popup span.price').text(`¥${ products.price }`);
}
// 轮播图的滚动
function initBannerScroll() {
	setTimeout(function() {
		bannerScroll = new IScroll($('.banner')[0], {
			scrollY: false, //关闭纵向滚动
			scrollX: true, //开启横向滚动
			momentum: false, //关闭惯性滚动
			snap: true //开启轮播图滚动
		});
		bannerScroll.on('scrollStart', function() {
			clearTimeout(time); //停止自动播放
		});
		bannerScroll.on('scrollEnd', function() {
			// 调整整个滚动条的位置， 实现无缝滚动
			var len = $('.banner li').length;
			if (this.currentPage.pageX === 0) {
				bannerScroll.disable(); //调整期间，禁止滚动
				setTimeout(function() {
					bannerScroll.goToPage(len - 2, 0, 0);
					bannerScroll.enable(); //调整结束，恢复滚动
				}, 10);
			}
			if (this.currentPage.pageX === len - 1) {
				bannerScroll.disable(); //调整期间，禁止滚动
				setTimeout(function() {
					bannerScroll.goToPage(1, 0, 0);
					bannerScroll.enable(); //调整结束，恢复滚动
				}, 10);
			}
			play();
		});
		bannerScroll.goToPage(1, 0, 0);
		play();
	}, 20);
}

function play() {
	time = setTimeout(function() {
		bannerScroll.next();
	}, 2000);
};
// 增加商品数量
$('.foot .increase').click(function() {
	if (count >= 10) {
		var $p = $('<p></p>').addClass('info').text('商品已经够多了哦...').appendTo('body');
		setTimeout(function() {
			$p.remove();
		}, 2000);
	} else {
		$('p.info').hide();
		count += 1;
		$('em.count').text(count);
	}
});
// 减少商品数量
$('.foot .decrease').click(function() {
	if (count <= 1) {
		var $p = $('<p></p>').addClass('info').text('不能在减了...').appendTo('body');
		setTimeout(function() {
			$p.remove();
		}, 2000);
	} else {
		count -= 1;
		$('em.count').text(count);

	}
});
// 点击切换弹窗
$('span.shopping').click(function() {
	// console.log('aaa');
	$('.add-immediately').show();
});
$('.btn-addproduct').click(function() {
	console.log('aaa');
	$('.add-immediately').show();
});
$('.top i').click(function() {
	console.log('aaa');
	$('.add-immediately').hide();
});
// 点击切换尺寸
$('.popup>.center>ul>li').click(function() {
	if ($(this).hasClass('active')) {
	} else {
		$(this).toggleClass('active').siblings().removeClass('active');
		size = $(this).text();
	}
});
// 点击加入购物车
$('.btn-sure').click(function() {
	if ($('.footer>ul>li:nth-child(2)>a>i>em').hasClass('active')) {

	} else {
		$('.footer>ul>li:nth-child(2)>a>i>em').addClass('active');
	}
	$('.add-immediately').hide();
	$.ajax({
		method: 'post',
		url: '/cart/addproduct',
		headers: {'Authorization': sessionStorage.getItem('token')},
		data: {
			pid: id,
			count: count,
			size: size
		},
		success: function(result) {
			if (result.status === 200) {
				getCount();
			} else if (result.status === 401) {
				window.location.href = '/login/index.html';
			}
		}
	});
});
//点击立即购买中的 btn-order 跳转到订单页面  ????
// $('button.btn-order').click(function() {
// 	setTimeout(function(){
// 		window.location.href = '/order/index.html?id='+id ;
// 	},500);
// });
// 导火索
getData().then(function(products) {
	showData(products);
	getCount();
});