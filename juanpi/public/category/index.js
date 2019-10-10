// 封装
// 请求一级分类数据
getData(0).then(data => {
	showMainList(data);
	toggleId(data[0].id);
});
// 切换 id
function toggleId(id) {
	// 请求二级列表分类数据
	getData(id).then(data => {
		showSubList(data);
	});
};
// 发送 ajax
function getData(mId){
	return new Promise(function (resolve, reject) {
		$.ajax({
			method: 'get',
			url: '/category/list/' + mId,
			success: function(result) {
				if(result.status === 200){
					resolve(result.data);
				}
			}
		});
	});
};
//拼接展示一级分类
function showMainList(data) {
	data.forEach(function(item, i) {
		$(
		`
			<li class='${i === 0 ? "active" : ""}'>
				<span class='${i === 0 ? "active" : ""}'>${item.name}</span>
			</li>
		`
		)
		.click(function() {
			// var fid = $(this).attr('active');
			if($(this).hasClass('active')){
				return;
			}
			$(this).toggleClass('active').siblings().removeClass('active');
			$('span').removeClass('active')
			$(this).find('span').addClass('active');
			// console.log(fid);
			toggleId(item.id);
		})
		.appendTo('.left ul');
	});
}; 
// 拼接展示二级分类
function showSubList(data) {
	// 每次展示一种二级分类之前都将上次二级分类的内容清空
	$('.right ul').empty();
	data.forEach(function(item) {
		$(
			`
				<li>
					<a href= '/list/index.html?name=${ item.name}&&cid=${ item.id}'>
						<img src='${ item.avatar }' />
						<span>${item.name}</span>
					</a>
				</li>
			`
			)
			.click(function() {
				toggleId(item.id, item.avatar);
			})
			.appendTo('.right ul')
	})
}

