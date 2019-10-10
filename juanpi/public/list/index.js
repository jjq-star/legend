// 点击切换页头里面的下拉菜单
$('.header>a.search>button').click(function() {
	console.log('aa');
	$(this).parent().next().toggleClass('active');
});
// 动态获取 列表页的 标题
var title = location.search.slice(1).split('&&')[0].split('=')[1];
$('.header>span.list-title').text(decodeURI(title));
var cid =parseInt(location.search.slice(1).split('&&')[1].split('=')[1]);

var count = 6; //每次请求 6条数据
var orderCol = 'recommend';  //排序是按哪一列进行的，从推荐开始
var orderDir = 'ASC';   //排序的方式是升序还是降序
var scroll = null;		//保存 iscroll 对象
var isLoading = false;	//标识是否正在加载
var hasMore = true;		//标识是否还有更多商品可以加载
var threshold = 40;		//标识上拉加载的极限距离
var wantLoadMore = false; //如果极限距离小于 40，表示不需要加载更多
// 获取数据
function getData(start){
	return new Promise(function(resolve, reject) {
		isLoading = true;
		$('p.info').text('加载中...');
		$.ajax({
			method: 'post',
			url: '/list/products',
			data: {
				cid: cid,
				start: start,
				count: count,
				orderCol: orderCol,
				orderDir: orderDir
			},
			success: function(result) {
				setTimeout(function() {
					isLoading = false;
					$('p.info').text(result.data.length < count ? '已到达底部' : '上拉加载');
					if(result.data.length < count) {
						hasMore = false;
					}
					if(result.status === 200) {
						resolve(result.data);
					} else {
						alert(result.message)
					}
				},500);
			}
		});
	});
};
// 展示数据
function showData(data) {
	data.forEach(function(item) {
		$(`
			<li>
				<a href='/detail/index.html?id=${ item.id }'>
					<img src='${item.avatar}' alt='${ item.name }' />
					<span class='product-price'>¥${item.price}</span>
					<span class='product-sale'>销量:${item.sale}</span>
					<h4>${item.name}</h4>
				</a>
			</li>
		`).appendTo($('.content ul'))
		initOrRefreshScroll();
	})
};
// 点击不同的选项进行排序
$('.list-nav ul li').click(function() {
	if($(this).find('span').hasClass('active')) {
		$(this).find('i').toggle().toggleClass('active');
		orderDir = orderDir === 'ASC' ? 'DESC' : 'ASC';
		$(this).find('span').toggleClass('asc').toggleClass('desc').attr('data-order-dir',orderDir);
	} else {
		orderCol = $(this).find('span').attr('data-order-col');
		$(this).find('span').addClass('active').parent().siblings().children().removeClass('active');
		$(this).find('i').toggle().toggleClass('active');
	};
	$('.content ul').empty();
	hasMore = true;
	getData(0).then(showData);
});

// 初始化 或 更新 滚动对象
function initOrRefreshScroll(){
	//imagesLoaded  图片加载插件，第一个参数必须是 dom 元素，通过数组将 jquery 转化为 dom
	imagesLoaded($('.scroll-wrapper')[0], function() {
		setTimeout(function(){
			if(scroll) {
				scroll.refresh();
			} else {
				scroll = new IScroll($('.scroll-wrapper')[0], {
					click: true,
					probeType:2
				});
				scroll.on('scroll', function() {
					if(hasMore && !isLoading) {
						if(this.y < 0 && this.maxScrollY - this.y > threshold) {
							$('p.info').text('放手加载..');
							wantLoadMore = true;
						} else {
							$('p.info').text('上拉加载..');
							wantLoadMore = false;
						}
					}
				});
				scroll.on('scrollEnd', function() {
					if(wantLoadMore) {
						getData($('.content ul li').length).then(showData);
						wantLoadMore = false;
					}
				});
			}
		},200);
	});
}

// 刚进页面请求数据
getData(0).then(showData);
