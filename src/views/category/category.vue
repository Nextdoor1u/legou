<template>
	<div class="category">
		<!-- 搜索栏部分 -->
		<search></search>
		<div class="category_container">
			<!-- 左侧导航部分 -->
			<div class="sideBar">
				<van-sidebar v-model="activeKey" @change="getNavIndex">
					<van-sidebar-item
						:title="item.name"
						v-for="item in categoryList"
						:key="item.id"
					/>
				</van-sidebar>
			</div>
			<!-- 右侧详情部分 -->
			<div class="sideBar_details">
				<img :src="titleList.banner_url" class="sideBar_details_img" />
				<p class="sideBar_details_categroy">-- {{ titleList.name }}分类 --</p>
				<ul class="sideBar_details_list">
					<li
						class="sideBar_details_item"
						v-for="item in titleList.subList"
						:key="item.id"
						@click="toGoodsList(item.id)"
					>
						<img :src="item.wap_banner_url" />
						<p>{{ item.name }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
//导入搜索按钮
import search from '@/views/home/search/searchBtn.vue';
//引入请求接口
import {
	indexaction as indexactionAPI,
	currentaction as currentactionAPI,
	goodsList as goodsListAPI,
} from '@/api/category/index';
export default {
	name: 'category',
	components: {
		search,
	},
	data() {
		return {
			activeKey: 0,
			//左侧分类数据
			categoryList: [],
			//右侧详情数据
			titleList: {},
			//获取对应的标题分类的id
			id: '',
		};
	},
	methods: {
		//请求侧边导航的数据
		async getsideBarList() {
			const {
				data: { categoryList: res },
			} = await indexactionAPI();
			//console.log('categoryList', res);
			//将列表赋值
			this.categoryList = res;
			//获取当前选中的标题的id
			this.id = this.categoryList[this.activeKey].id;
			//根据id获取标题的内容
			this.getTitleList();
		},
		//获取侧边栏选择的标题的分类
		async getTitleList() {
			//console.log(typeof this.id);
			const {
				data: {
					data: { currentOne: res },
				},
			} = await currentactionAPI({ id: this.id });
			this.titleList = res;
			//console.log(res);
		},
		//点击时切换右侧的详情内容
		getNavIndex(index) {
			//console.log(index);
			this.id = this.categoryList[index].id;
			this.getTitleList();
		},
		//跳转到分类详情页
		toGoodsList(id) {
			this.$router.push({ path: '/categroyGoodsList2', query: { id: id } });
		},
	},
	created() {},
	mounted() {
		//请求侧边导航数据
		this.getsideBarList();
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
