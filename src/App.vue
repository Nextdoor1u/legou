<template>
	<div id="app">
		<van-tabbar route active-color="#c12c1f" v-if="showTabbar">
			<van-tabbar-item replace to="/home" icon="wap-home-o"
				>首页</van-tabbar-item
			>
			<van-tabbar-item replace to="/subject" icon="description"
				>专题</van-tabbar-item
			>
			<van-tabbar-item replace to="/category" icon="apps-o"
				>分类</van-tabbar-item
			>
			<van-tabbar-item replace to="/cart" icon="shopping-cart-o"
				>购物车</van-tabbar-item
			>
			<van-tabbar-item replace to="/mine" icon="friends-o"
				>我的</van-tabbar-item
			>
		</van-tabbar>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'APP',
	data() {
		return {
			//控制底部导航栏的显示和隐藏
			showTabbar: true,
		};
	},
	watch: {
		//监听是否是导航栏的页面
		$route(to) {
			//设置一个路由名字的白名单
			let arr = ['home', 'subject', 'category', 'cart', 'mine'];
			this.showTabbar = arr.some((el) => el.includes(to.name)) ? true : false;
		},
	},
	mounted() {},
};
</script>
<style lang="less">
body,
html {
	width: 100%;
	height: 100%;
	background-color: #f4f4f4;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-touch-callout: none !important;
	-webkit-user-select: none;
	text-align: center;
	color: #2c3e50;
	overflow: auto;
	//height: calc(~'100% - 50px');
	// margin-bottom: 50px;
}
</style>

<style>
#app {
	min-height: calc(100% - 50px);
}
</style>
