
var arr = ['home', 'category', 'cart', 'profile'];
var i = arr.findIndex(function(item) {
	return parent.location.href.indexOf(item) !== -1;
});
$('li>a>i').eq(i).addClass('active');
$('li>a>span').eq(i).addClass('active');
// 跳转页面
$('li a').click(function(e) {
	e.preventDefault();
	window.parent.location.href = this.href;
});