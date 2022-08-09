<template>
	<div class="favorite">
		<!-- 顶部导航 -->
		<navBar></navBar>
		<!-- 标题 -->
		<h2 class="favorite_title">商品收藏</h2>
		<div class="favorite_container">
			<!-- 收藏列表 -->
			<ul class="favorite_container_list">
				<li
					class="favorite_container_item"
					v-for="item in favoriterListL"
					:key="item.id"
				>
					<img :src="item.list_pic_url" />
					<p>{{ item.name }}</p>
					<p>￥{{ item.retail_price }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
//引入顶部导航
import navBar from '@/components/navBar.vue';
//引入接口
import { listAction as listActionAPI } from '@/api/goodsList/index';
export default {
	name: 'favorite',
	components: {
		navBar,
	},
	data() {
		return {
			//用户id
			id: localStorage.getItem('userId'),
			//收藏列表
			favoriterListL: [],
		};
	},
	methods: {
		//获取收藏列表
		async getFavoriteList() {
			const {
				data: { collectGoodsList: res },
			} = await listActionAPI({
				openId: this.id,
			});
			console.log(res);
			this.favoriterListL = res;
		},
	},
	created() {
		//获取收藏列表
		this.getFavoriteList();
	},
	mounted() {},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
