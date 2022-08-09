//分类接口
import request from '../request';

//左侧导航栏标题获取
function indexaction() {
	return request({
		url: 'category/indexaction',
		method: 'get',
	});
}

//右侧导航栏详情
function currentaction(data) {
	return request({
		url: 'category/currentaction',
		method: 'get',
		data,
	});
}

//点击后商品详情列表
function goodsList(data) {
	return request({
		url: 'goods/goodsList',
		method: 'get',
		data,
	});
}
//点击后上部导航列表
function categoryNav(data) {
	return request({
		url: 'category/categoryNav',
		method: 'get',
		data,
	});
}
//意见反馈
function submitAction(data) {
	return request({
		url: 'feedback/submitAction',
		method: 'post',
		data,
	});
}
export { indexaction, currentaction, goodsList, categoryNav, submitAction };
