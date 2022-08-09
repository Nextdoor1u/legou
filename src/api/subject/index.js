//关于专题的接口
import request from '../request';

//专题列表
function listaction(data) {
	return request({
		url: 'topic/listaction',
		method: 'get',
		data,
	});
}
//专题详情
function detailaction(data) {
	return request({
		url: 'topic/detailaction',
		method: 'get',
		data,
	});
}
export { listaction, detailaction };
