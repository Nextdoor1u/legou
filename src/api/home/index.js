//home页面的接口
import request from '@/api/request';
//首页数据接口
function index() {
	return request({
		url: 'index/index',
		method: 'get',
	});
}
//首页分类的接口
function indexaction() {
	return request({
		url: 'category/indexaction',
		method: 'get',
	});
}

//通过id获取首页分类列表数据页的数据
function currentaction(data) {
	return request({
		url: 'category/currentaction',
		method: 'get',
		data,
	});
}
//品牌制造头部内容
function detailaction(data) {
	return request({
		url: 'brand/detailaction',
		method: 'get',
		data,
	});
}

//品牌制造商产品
function listaction(data) {
	return request({
		url: 'brand/listaction',
		method: 'get',
		data,
	});
}
//新品首发和人气推荐
function goodsList(data) {
	return request({
		url: 'goods/goodsList',
		method: 'get',
		data,
	});
}
export {
	index,
	indexaction,
	currentaction,
	detailaction,
	listaction,
	goodsList,
};
