<template>
	<div class="categroyGoodsList">
		<!-- 顶部导航部分 -->
		<navBar></navBar>
		<!-- 顶部商品标题 -->
		<div class="categroyGoodsList_nav">
			<!-- 分类页跳转 -->
			<van-tabs v-model="currentIndex" @click="changeList">
				<van-tab
					:title="item.name"
					v-for="item in navList"
					:key="item.id"
				></van-tab>
			</van-tabs>
			<!-- 商品详情部分 -->
			<div class="categroyGoodsList_container">
				<div class="categroyGoodsList_container_title">
					<h4>{{ currentNav.name }}</h4>
					<p>{{ currentNav.front_desc }}</p>
				</div>
				<ul class="categroyGoodsList_container_list">
					<li
						class="categroyGoodsList_container_item"
						v-for="item in categoryList"
						:key="item.id"
						@click="toGoodsDetails(item.id)"
					>
						<img :src="item.list_pic_url" />
						<div class="categroyGoodsList_container_item_text">
							<h5>{{ item.name }}</h5>
							<p>￥{{ item.retail_price }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
//导入接口
import {
	categoryNav as categoryNavAPI,
	goodsList as goodsListAPi,
} from '@/api/category/index';
//导入首页5个导航的数据接口
import {
	indexaction as indexactionAPI,
	currentaction as currentactionAPI,
} from '@/api/home/index';
//导入导航组件
import navBar from '@/components/navBar.vue';
export default {
	name: 'categroyGoodsList2',
	components: {
		navBar,
	},
	data() {
		return {
			//顶部导航内容
			navList: [],
			//选中的导航
			currentNav: {},
			//选中的下标
			currentIndex: 0,
			//底部商品内容
			categoryList: [],
			//商品详情列表的id
			categoryId: this.$route.query.id,
		};
	},
	methods: {
		//获取分类页商品列表 首页的数据和分类页的ID都可以获取到数据
		async getClassifyGoodsList() {
			const { data: res } = await goodsListAPi({
				categoryId: this.categoryId,
			});
			console.log('商品列表', res);
			this.categoryList = res.data;
		},
		//获取分类页导航数据
		async getClassifyNav() {
			const { data: res } = await categoryNavAPI({
				id: this.categoryId,
			});
			console.log('导航数据', res);
			this.navList = res.navData;
			this.currentNav = res.currentNav;
			this.currentIndex = res.navData.findIndex((el) => {
				return el.id == res.currentNav.id;
			});
		},
		//点击切换顶部导航
		changeList(name) {
			this.categoryId = this.navList[name].id;
			this.getClassifyGoodsList();
		},
		//跳转商品详情
		toGoodsDetails(id) {},
	},
	computed: {},
	created() {},
	mounted() {
		//获取分类页商品列表
		this.getClassifyGoodsList();
		//获取分类页导航数据
		this.getClassifyNav();
	},
};
</script>

<style scoped lang="less">
@import './style.less';
</style>
