var region = { province: null, city: null, area: null, street: null };
var isAdd = true;				//标识 当前是不是新增状态，默认为 新增状态
var addressList = [];			//定义一个数组来存放 地址信息
var id = 0;						//标识当前操作的id

// 展示街道
function showStreet() {
	$ul = $('ul.region-list').empty();
	region.area.childs.forEach(function(item) {
		$(`<li>${ item.name }</li>`).appendTo($ul);
		$ul.scrollTop(0).off('click').on('click', function(e) {
			if(e.target.tagName !== 'LI') return;
			region.street = region.area.childs.find(function(item) {
				return item.name === $(e.target).text();
			});
			// 将当前选择的街道展示到 “请选择” 前面
			$('p.region-cur').text(`${ region.province.name} | ${ region.city.name } | ${ region.area.name} | ${ region.street.name } | 请选择`);
			$('li.region>input').val(`${ region.province.name} | ${ region.city.name } | ${ region.area.name} | ${ region.street.name }`);
			$('.region-dialog-wrapper').removeClass('show');
		});
	});
}
// 展示区域
function showArea() {
	$ul = $('ul.region-list').empty();
	region.city.childs.forEach(function(item) {
		$(`<li>${ item.name }</li>`).appendTo($ul);
		$ul.scrollTop(0).off('click').on('click', function(e) {
			if(e.target.tagName !== 'LI') return;
			region.area = region.city.childs.find(function(item) {
				return item.name === $(e.target).text();
			});
			// 将当前选择的区域展示到 “请选择” 前面
			$('p.region-cur').text(`${ region.province.name} | ${ region.city.name } | ${ region.area.name} | 请选择`);
			showStreet();
		});
	});
}
// 展示城市
function showCity() {
	$ul = $('ul.region-list').empty();
	region.province.childs.forEach(function(item) {
		$(`<li>${ item.name }</li>`).appendTo($ul);
		$ul.scrollTop(0).off('click').on('click', function(e) {
			if(e.target.tagName !== 'LI') return;
			region.city = region.province.childs.find(function(item) {
				return item.name === $(e.target).text();
			});
			// 将当前选择的城市展示到 “请选择” 前面
			$('p.region-cur').text(`${ region.province.name} | ${ region.city.name } | 请选择`);
			showArea();
		});
	});
}
// 展示省份
function showProvince() {
	// 将 ul 中的内容清空
	$ul = $('ul.region-list').empty();
	regions.forEach(function(item) {
		$(`<li>${ item.name }</li>`).appendTo($ul);
		$ul.scrollTop(0).off('click').on('click', function(e) {
			if(e.target.tagName !== 'LI') return;
			region.province = regions.find(function(item) {
				return item.name === $(e.target).text();
			});
			// 将当前选择的省份展示到 “请选择” 前面
			$('p.region-cur').text(`${ region.province.name} | 请选择`);
			showCity();
		});
	});
}
// 新增地址
function addAddress() {
	http({
		method: 'post',
		url: '/address/add',
		data: $('form').serialize()  //serialize() 函数，自动获取表单元素中的信息，转换为键值对
	}).then(function(id) {
		//返回数据后要做的事情
		//1.更新 addressList 与服务器同步
		var obj = {
			id: id,
			receiveName: $('.receive-name').val(),
			receiveTel: $('.receive-tel').val(),
			receiveAddress: $('.receive-address').val(),
			receiveAddressDetail: $('.receive-detail').val()
		}
		console.log(obj);
		addressList.push(obj);
		//2.更新dom，追加li
		showAddAddressItem(obj);
		//3.退出编辑状态
		$('.header').removeClass('edit').removeClass('update');
		$('.content').toggleClass('hide');
		$('form')[0].reset();
		$('.region-dialog-wrapper').removeClass('show');
		
	});
}
//展示新增的地址
function showAddAddressItem(item) {
	$(`
		<li data-id='${ item.id }'>
			<p class='name'>${ item.receiveName }</p>
			<p class='tel'>${ item.receiveTel }</p>
			<p class='address'>${ item.receiveAddress } ${ item.receiveAddressDetail }</p>
			<i class='btn-update iconfont icon-edit'></i>
			<a class='btn-default ${ item.isDefault ? 'default' : ''}'>
			</a>
			
		</li>
	`).appendTo('ul.address-list');
}
// 展示数据库中已有的收货地址
function showAddressList() {
	addressList.forEach(function(item) {
		showAddAddressItem(item);
	});
}
// 修改地址
function updateAddress() {
	http({
		method: 'post',
		url: '/address/update/' + id,
		data: $('form').serialize()  //serialize() 函数，自动获取表单元素中的信息，转换为键值对
	}).then(function() {
		//数据返回要做的事情
		//1.更新 addressList 与数据库同步
		var target = addressList.find(function(item) {return item.id === id});
		target.receiveName = $('input.receive-name').val();
		target.receiveTel = $('input.receive-tel').val();
		target.receiveAddress = $('input.receive-address').val();
		target.receiveAddressDetail = $('input.receive-detail').val();
		//2.更新 dom， 追加li
		var $li = $(`li[data-id=${id}]`);
		$li.find('p.name').text(target.receiveName);
		$li.find('p.tel').text(target.receiveTel);
		$li.find('p.address').text(`${ target.receiveAddress } ${ target.receiveAddressDetail }`);
		//3.退出编辑
		$('.header').removeClass('edit').removeClass('update');
		$('.content').toggleClass('hide');
		$('form')[0].reset();
	});
};
// 验证手机号
function checkPhone($tel) {
	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($tel))){ 
	    alert("手机号码有误，请重填");  
	    return false; 
	} else{
		return 1;
	}
}
// 点击 添加地址 
$('button.btn-add').click(function() {
	isAdd = true;
	$('.header').addClass('edit');
	$('.content').toggleClass('hide');
});
// 点击 所在地区
$('li.region').click(function() {
	// 点击所在地区时调用 showProvince()函数，让地址展示出来
	showProvince();
	$('p.region-cur').text('请选择');
	$('.region-dialog-wrapper').addClass('show');
});
// 点击 地址弹窗之外的部分使弹窗隐藏
$('.region-dialog-wrapper').click(function(e) {
	// console.log(this);
	// console.log(e.target);
	//this 指的是 $('.region-dialog-wrapper') 部分 ；e.target指的是当前点击的部分
	if(e.target === this) $('.region-dialog-wrapper').removeClass('show');
});
// 点击 关闭使地址弹窗隐藏
$('.region-dialog-wrapper>.region-dialog>i').click(function() {
	$('.region-dialog-wrapper').removeClass('show');
});
//点击后退使地址弹窗隐藏
$('a.edit-back').click(function() {
	$('.header').removeClass('edit').removeClass('update');
	$('.content').toggleClass('hide');
	$('form')[0].reset();
	$('.region-dialog-wrapper').removeClass('show');
});
// 点击保存并使用 新增地址 || 修改地址
$('button.btn-save').click(function() {
	// 将添加地址的空页面隐藏
	$('ul.address-list>.null').addClass('hide');
	// 检查信息
	var $name = $('input.receive-name').val();
	var $tel = $('input.receive-tel').val();
	var $address = $('input.receive-address').val();
	var $detail = $('input.receive-detail').val;
	if($name !== '' && $tel != '' && $detail != '' && $address != '') {
		if(checkPhone($tel) == '1') {
			if(isAdd) addAddress();
			else updateAddress();
		}
	} else {
		alert('请核对信息');
	}
});
// 展示数据库中已有的收货地址
http({
	method: 'post',
	url: '/address/list'
}).then(function(data) {
	addressList = data;  //将返回来的数据（数据库中已有的收货地址）存放到 addressList数组 中 
	if(addressList.length > 0) {
		$('.content>ul>.null').addClass('hide');
		showAddressList();
	}
});
// 点击 进入 修改地址页面
$('ul.address-list').click(function(e) {//修改地址
	if($(e.target).hasClass('btn-update')) {
		isAdd = false;
		$('.header').addClass('edit');
		$('.content').toggleClass('hide');
		if(!isAdd) $('.header').addClass('update');
		//当前操作的 id
		id = parseInt($(e.target).closest('li').attr('data-id')); //closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
		var target = addressList.find(function(item) {
			return item.id === id;
		});
		$('input.receive-name').val(target.receiveName);
		$('input.receive-tel').val(target.receiveTel);
		$('input.receive-address').val(target.receiveAddress);
		$('input.receive-detail').val(target.receiveAddressDetail);
	}
	if($(e.target).hasClass('btn-default')) {//设置为默认地址
		if($(e.target).hasClass('default')) return;
		id = parseInt($(e.target).closest('li').attr('data-id'));
		// console.log(id);
		http({
			method: 'post',
			url: '/address/default',
			data: {id: id}
		}).then(function() {
			addressList.forEach(function(item) {
				item.isDefault = item.id === id ? 1 : 0;
			});
			$('.btn-default').removeClass('default');
			$(e.target).addClass('default');
		});
	}
});
// 删除功能
$('button.btn-delete').click(function() {
	if(!confirm('确认删除？')) return;
	http({
		method: 'post',
		url: '/address/delete',
		data: { id: id}
	}).then(function() {
		//数据返回要做的事情
		//1.将当前操作的收货地址的 id 存储
		var i = addressList.findIndex(function(item) { return item.id === id});
		//2.更新 addressList
		addressList.splice(i,1);
		console.log(addressList);
		//3.将对应的 li 删除
		$(`li[data-id=${ id }]`).remove();
		//4.退出编辑模式
		$('.header').removeClass('edit').removeClass('update');
		$('.content').toggleClass('hide');
		$('form')[0].reset();
		// $('.region-dialog-wrapper').removeClass('show');
	});
});