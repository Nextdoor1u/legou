import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/home/index.vue';
import search from '../views/home/search/search.vue';
Vue.use(VueRouter);
const routes = [
	{ path: '/', redirect: '/home' },
	{
		//主页
		path: '/home',
		name: 'home',
		component: HomeView,
	},
	{
		//地图组件
		path: '/home/amap',
		component: () => import('../views/home/amap/amap.vue'),
	},
	{
		//搜索
		path: '/home/serach',
		name: 'serach',
		component: search,
	},
	{
		//购物车
		path: '/cart',
		name: 'cart',
		component: () => import('../views/cart/Cart.vue'),
	},
	{
		//分类
		path: '/category',
		name: 'category',
		component: () => import('../views/category/category.vue'),
	},
	{
		//分类页商品详情
		path: '/categroyGoodsList',
		name: 'categroyGoodsList',
		component: () => import('../views/category/categroyGoodsList/index.vue'),
	},
	{
		//*分类页商品详情修改
		path: '/categroyGoodsList2',
		name: 'categroyGoodsList2',
		component: () => import('../views/category/categroyGoodsList/index2.vue'),
	},
	{
		//我的
		path: '/mine',
		name: 'mine',
		component: () => import('../views/mine/mine.vue'),
	},
	{
		//主题
		path: '/subject',
		name: 'subject',
		component: () => import('../views/subject/index.vue'),
	},
	{
		//主题详情
		path: '/subjectDetails',
		name: 'subjectDetails',
		component: () =>
			import('../views/subject/subjectDetails/subjectDetails.vue'),
	},
	{
		//品牌制造商
		path: '/brandMake',
		name: 'brandMake',
		component: () => import('../views/home/brandMake/brandMake.vue'),
	},
	{
		//最新和热门
		path: '/newAndHot',
		name: 'newAndHot',
		component: () => import('../components/newAndHot.vue'),
	},
	{
		//商品详情
		path: '/goodsdetails',
		name: 'goodsdetails',
		component: () => import('../views/category/goodsdetails/goodsdetails.vue'),
	},
	{
		//订单填写页
		path: '/order',
		name: 'order',
		component: () => import('../views/order/order.vue'),
	},
	{
		//收货地址列表页
		path: '/orderAddressList',
		name: 'orderAddressList',
		component: () =>
			import('../views/order/orderAddressList/orderAddressList.vue'),
	},
	{
		//添加地址页
		path: '/addLocation',
		name: 'addLocation',
		component: () => import('../components/addLocation.vue'),
	},
	{
		//商品收藏页面
		path: '/favorite',
		name: 'favorite',
		component: () => import('@/views/favorite/favorite.vue'),
	},
	{
		//意见反馈
		path: '/feedback',
		name: 'feedback',
		component: () => import('../components/feedback.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
