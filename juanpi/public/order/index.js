var id = location.search.slice(1).split('=')[1];
console.log(id);
//发送 ajax
http({
	method: 'post',
	url: '/order/product',
	data: {
		id:id
	}
}).then(function() {
	
});
