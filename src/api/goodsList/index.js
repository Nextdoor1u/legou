//商品详情
import request from '../request';
function detailaction(data) {
	return request({
		url: 'goods/detailaction',
		method: 'get',
		data,
	});
}
//获取商品收藏列表
function listAction(data) {
	return request({
		url: 'collect/listAction',
		method: 'get',
		data,
	});
}
//添加收藏列表
function addcollect(data) {
	return request({
		url: 'collect/addcollect',
		method: 'post',
		data,
	});
}
//获取购物车列表
function cartList(data) {
	return request({
		url: 'cart/cartList',
		method: 'get',
		data,
	});
}
//添加购物车列表
function addCart(data) {
	return request({
		url: 'cart/addCart',
		method: 'post',
		data,
	});
}
//删除购物车商品
function deleteAction(data) {
	return request({
		url: 'cart/deleteAction',
		method: 'get',
		data,
	});
}
export { detailaction, listAction, addcollect, cartList, addCart ,deleteAction};
