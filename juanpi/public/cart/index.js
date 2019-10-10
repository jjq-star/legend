var cartList = [];		//记录用户的购物信息
var isEdit = false;		//标识是否进入编辑状态
// 编辑模式
$('.header>button.btn-edit-toggle').click(function() {
	isEdit = !isEdit;
	$(this).text($(this).text() === '编辑' ? '完成' : '编辑');
	$('.footer').toggleClass('active');
	if(isEdit) {
		$('.content>ul>li>span.edit').show();
		$('.content>ul>li>span.normal').hide();
	} else {
		$('.content>ul>li>span.edit').hide();
		$('.content>ul>li>span.normal').show();
	}
});
// 获取数据
function getData() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: 'post',
			url:'/cart/list',
			headers: {'Authorization': sessionStorage.getItem('token')},
			success: function(result) {
				if(result.status === 200) {
					resolve(result.data);
					// cartList = result.data;
				} else if(result.status === 401) {
					window.location.href = '/login/index.html';
				}
			}
		})
	});
}
// 展示数据
function showData() {
	cartList.forEach(function(item) {
		$(`
			<li data-id='${ item.id }'>
				<span class='normal iconfont icon-select checkbox checked'></span>
				<span class='edit iconfont icon-select checkbox'></span>
				<img src='${ item.avatar }' />
				<div class='detail clearfix'>
					<h3 class='title'>${ item.name }</h3>
					<span class='size'>尺寸:${ item.size }</span>
					<p class="price">¥${item.price }</p>
					<div class="product-number">
						<span class='decrease iconfont icon-decrease ${ item.count == 1? 'disable' : ''}'></span>
						<em class='number'>${ item.count }</em>
						<span class='increase iconfont icon-increase1 ${ item.count == 10? 'disable' : ''}'></span>
					</div>
				</div>
			</li>
		`)
		.appendTo('.content ul');
	});
	$('ul.cart-list span.checkbox').click(function() {
		$(this).toggleClass('checked');
		var $all = isEdit ? $('.footer.edit i.checkbox') : $('.footer.normal i.checkbox');
		var id = parseInt($(this).parent().attr('data-id'));
		var target = cartList.find(function(item) { return item.id === id;});
		target[isEdit? 'checked2' : 'checked1'] = $(this).hasClass('checked');
		updateFooter();
	});
	$('span.decrease').click(decrease);
	$('span.increase').click(increase);
}
// 更新页脚
function updateFooter() {
	if(cartList.length === 0) {
		$('.footer').hide();
		$('iframe').show();
		$('.null').show();
		$('.btn-edit-toggle').hide();
		$('.content').css('background-color','#f4f4f4');
		return;
	}
	// 计算总金额和数量
	var number = 0, money = 0, editNumber = 0;
	cartList.forEach(function(item) {
		if(item.checked1) {
			number += item.count;
			money += item.price * item.count;
		}
		if(item.checked2) {
			editNumber += item.count;
		}
	});
	$('em.total').text(money);
	$('em.numbers').text(number);
	$('em.delete').text(editNumber > 0 ? `${editNumber}` : '0');
	// 更新全选、反选
	// 普通状态
	cartList.every(function(item) {
		// console.log(item.checked1);
		return item.checked1;
	}) ? $('.footer.normal i.checkbox').addClass('checked')
	   : $('.footer.normal i.checkbox').removeClass('checked');
	// 编辑状态
	cartList.every(function(item) {
		return item.checked2;
	}) ? $('.footer.edit i.checkbox').addClass('checked')
	   : $('.footer.edit i.checkbox').removeClass('checked');
};
// 增加商品数量
function increase() {
	if($(this).hasClass('disable')) {
		var $p = $('<p></p>').addClass('alert').text('到达上限...').appendTo('body');
		setTimeout(function() { $p.remove(); },2000);
		return;
	}
	var id = parseInt($(this).closest('li').attr('data-id'));
	// console.log(id);
	// 发送ajax
	$.ajax({
		method: 'get',
		url: '/cart/increase/' + id,
		headers: {'Authorization': sessionStorage.getItem('token')},
		success: (result) => {
			if(result.status === 200) {
				$(this).prevAll('.decrease').removeClass('disable');
				var target = cartList.find(function(item){ return item.id === id});
				target.count += 1;
				// console.log(target.count);
				$(this).prev().text(target.count);
				if(target.count > 9) {
					$(this).addClass('disable');
					updateFooter();
				}
			} else {
				alert(result.message);
			}
		}
	});
	updateFooter();
}
// 减少商品数量
function decrease() {
	if($(this).hasClass('disable')) {
		var $p = $('<p></p>').addClass('alert').text('到达底限...').appendTo('body');
		setTimeout(function() { $p.remove(); },2000);
		return;
	}
	var id = parseInt($(this).closest('li').attr('data-id'));
	// console.log(id);
	// 发送ajax
	$.ajax({
		method: 'get',
		url: '/cart/decrease/' + id,
		headers: {'Authorization': sessionStorage.getItem('token')},
		success: (result) => {
			if(result.status === 200) {
				$(this).nextAll('.increase').removeClass('disable');
				var target = cartList.find(function(item){ return item.id === id});
				target.count -= 1;
				// console.log(target.count);
				$(this).next().text(target.count);
				if(target.count == 1) {
					$(this).addClass('disable');
				}
				updateFooter();
			} else {
				alert(result.message);
			}
		}
	});
	// updateFooter();
}
// 全选/反选
$('.footer>div').click(function() {
	$(this).find('i').toggleClass('checked');
	var groupName = $(this).find('i').attr('data-group');
	var checked = $(this).find('i').hasClass('checked');
	var $checkboxes = $('.content ul.cart-list li>span').filter(`.${groupName}`);
	// 判断 全选按钮是否选中，如果选中了就将上面产品的按钮都选中；如果没有，将产品的按钮都不选中
	if(checked) {
		$checkboxes.addClass('checked');
	} else {
		$checkboxes.removeClass('checked');
	}
	cartList.forEach(function(item) {
		if(groupName === 'normal') {
			item.checked1 = checked;
		} else {
			item.checked2 = checked;
		}
	})
	// 更新页脚
	updateFooter();
});
// 删除功能
$('.btn-delete').click(function() {
	var deleteId = [];
	cartList.forEach(function(item) {
		if(item.checked2) {
			deleteId.push(item.id);
		}
	});
	
	if(deleteId.length === 0) {
		var $p = $('<p></p>').addClass('alert').text('未选中任何一款商品').appendTo('body');
		setTimeout(function(){ $p.remove(); },2000);
		return;
	}
	$.ajax({
		method: 'post',
		url: '/cart/delete',
		data: {
			deleteId: JSON.stringify(deleteId)
		},
		headers: {'Authorization': sessionStorage.getItem('token')},
		success: function(result) {
			if(result.status === 200) {
				deleteId.forEach(function(item) {
					var i = cartList.findIndex(function(item2) { return item2.id === item; });
					cartList.splice(i, 1);
					console.log(cartList);
					$(`ul.cart-list li[data-id=${ item }]`).remove();
					
				});
			} else {
				alert(result.message);
			}
			updateFooter();
		}
	});
	
});
// 结算功能
$('.btn-settlement').click(function() {
	console.log('aa');
	var settlementId = [], account = 0, size = 'L';
	cartList.forEach(function(item) {
		if(item.checked1) {
			settlementId.push(item.id);
			account = item.price * item.count;
			size = item.size;
		}
	});
	if(settlementId.length === 0) {
		var $p = $('<p></p>').addClass('alert').text('未选中任何一款商品').appendTo('body');
		setTimeout(function(){ $p.remove(); },2000);
		return;
	}
	$.ajax({
		method: 'post',
		url: '/cart/settlement',
		data: {
			settlementId: JSON.stringify(settlementId),
			account: account,
			size: size
		},
		headers: {'Authorization': sessionStorage.getItem('token')},
		success: function(result) {
			if(result.status === 200) {
				settlementId.forEach(function(item) {
					var i = cartList.findIndex(function(item2) { return item2.id === item; });
					cartList.splice(i, 1);
					console.log(cartList);
					$(`ul.cart-list li[data-id=${ item }]`).remove();
				});
				updateFooter();
			} else {
				alert(result.message);
			}
		}
	});
});
// 导火索
getData().then(function(data) {
	data.forEach(function(item) {
		item.checked1 = true;
		item.checked2 = false;
		// console.log(item);
	});
	cartList = data;
	showData();
	updateFooter();
});