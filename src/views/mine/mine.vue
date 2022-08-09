<template>
	<div class="mine">
		<!-- 顶部头像部分 -->
		<div class="mine_logo">
			<div class="mine_logo_img">
				<img src="https://t8.baidu.com/it/u=3711336696,2362674254&fm=218" />
			</div>
			<div class="mine_logo_name">用户: {{ userInfo.nickName }}</div>
		</div>
		<!-- 功能汇总模块 -->
		<div class="mine_tab">
			<ul class="mine_tab_list" @click="toDoSome($event)">
				<li class="mine_tab_item">我的订单</li>
				<li class="mine_tab_item">优惠券</li>
				<li class="mine_tab_item">我的足迹</li>
				<li class="mine_tab_item">我的收藏</li>
				<li class="mine_tab_item">地址管理</li>
				<li class="mine_tab_item">联系客服</li>
				<li class="mine_tab_item">帮助中心</li>
				<li class="mine_tab_item">意见反馈</li>
				<li class="mine_tab_item"></li>
				<li class="mine_tab_item"></li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	name: 'mine',
	data() {
		return {};
	},
	methods: {
		//点击跳转到对应的功能
		toDoSome({ target: { innerText: liName } }) {
			if (liName == '地址管理') {
				this.$router.push('/orderAddressList');
			} else if (liName == '我的收藏') {
				this.$router.push('/favorite');
			} else if (liName == '意见反馈') {
				this.$router.push('/feedback');
			} else {
				Toast('功能还在开发中');
			}
		},
	},
	computed: {
		//用户信息
		userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'));
		},
	},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
