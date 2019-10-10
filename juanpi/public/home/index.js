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
		// bannerScroll.on('scroll', function() {
		// 	
		// });
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
};
function play() {
	time = setTimeout(function() {
		bannerScroll.next();
	}, 2000);
};
initBannerScroll();
// 监听高度
$(window).scroll(function() {
	var height = $(document).scrollTop();
	// console.log(height);
	if(height > 1000) {
		$('.page-wrapper>img').addClass('active');
	} else {
		$('.page-wrapper>img').removeClass('active');
	}
});
// 点击回到顶部
$('.page-wrapper>img').click(function() { $(document).scrollTop(0); });
// 点击切换状态
$('.content>.title>span').click(function() {
	$('.content>.title>span').removeClass('active');
	$(this).addClass('active');
});