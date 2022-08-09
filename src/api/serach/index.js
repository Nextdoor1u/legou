//封装搜索的接口
import request from '@/api/request';
//热门搜索和历史搜索
function indexaction(data) {
	return request({
		url: 'search/indexaction',
		method: 'get',
		data,
	});
}
//搜索提示框的数据
function helperaction(data) {
	return request({
		url: 'search/helperaction',
		method: 'get',
		data,
	});
}

//搜索的关键字添加到数据库
function addhistoryaction(data) {
	return request({
		url: 'search/addhistoryaction',
		method: 'post',
		data,
	});
}
//清空搜索历史记录
function clearhistoryAction(data) {
	return request({
		url: 'search/clearhistoryAction',
		method: 'post',
		data,
	});
}
export { indexaction, helperaction, addhistoryaction, clearhistoryAction };
