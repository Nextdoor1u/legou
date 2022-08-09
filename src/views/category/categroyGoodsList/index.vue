<template>
	<div class="categroyGoodsList">
		<!-- 顶部导航部分 -->
		<navBar></navBar>
		<!-- 顶部商品标题 -->
		<div class="categroyGoodsList_nav">
			<!-- 分类跳转 -->
			<goodstitle v-if="!isHome">
				<van-tabs v-model="active" @click="changeList" slot="goods">
					<van-tab :title="item.name" v-for="item in navList" :key="item.id">
					</van-tab>
				</van-tabs>
			</goodstitle>
			<!-- 首页跳转 -->
			<goodstitle v-if="isHome">
				<van-tabs v-model="active" @click="changeList" slot="five">
					<van-tab
						:title="item.name"
						v-for="item in fiveNavList"
						:key="item.id"
					>
					</van-tab>
				</van-tabs>
			</goodstitle>
			<!-- 分类页跳转 -->
			<!-- <van-tabs
				v-model="currentNav.show_index"
				@click="changeList"
				v-if="!isHome"
			>
				<van-tab
					:title="item.name"
					v-for="item in navList"
					:key="item.id"
				></van-tab>
			</van-tabs> -->
		</div>
		<!-- 商品详情部分 -->
		<div class="categroyGoodsList_container">
			<div class="categroyGoodsList_container_title">
				<h4>{{ currentName }}</h4>
				<p>{{ currentDes }}</p>
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
//导入商品的标题
import goodstitle from '@/components/goodstitle.vue';
export default {
	name: 'categroyGoodsList',
	components: {
		navBar,
		goodstitle,
	},
	data() {
		return {
			//上级页面点击的id
			id: '',
			//导航列表
			navList: [],
			//5个导航列表
			fiveNavList: [],
			//导航激活的下标
			active: 0,
			//获取商品导航商品明细
			categoryList: [],
			//判断是分类跳转还是首页跳转
			isHome: true,
			//激活的数据
			currentNav: {},
			currentName: '',
			currentDes: '',
		};
	},
	methods: {
		//获取上部导航列表
		async categoryNavList() {
			this.id = this.$route.query.id;
			const { data: res } = await categoryNavAPI({ id: this.id });
			console.log('categoryNavList', res);
			//顶部导航列表
			this.navList = res.navData;
			//console.log(this.navList);
			//当前激活的导航
			this.currentNav = res.currentNav;
			this.currentName = this.currentNav.name;
			this.currentDes = this.currentNav.front_desc;
			console.log('currentNav', this.currentNav);
			//激活的导航id
			this.active = res.currentNav.show_index - 1;
			console.log(this.active);
			this.getCategoryList();
		},
		//获取所有相关商品列表
		async getCategoryList() {
			const {
				data: { data: res },
			} = await goodsListAPi({ categoryId: this.id });
			//console.log(res);
			this.categoryList = res;
		},
		//跳转到商品详情页列表
		toGoodsDetails(id) {
			this.$router.push({ path: '/goodsdetails', query: { id: id } });
		},
		//点击导航刷新列表
		changeList(name) {
			//console.log(name);
			// 去导航列表相对的id
			if (this.fiveNavList[0]) {
				this.id = this.fiveNavList[name].id;
			} else if (this.navList[0]) {
				this.id = this.navList[name].id;
			}
			this.getCategoryList();
		},
		//*---------首页导航点击过来的数据------------------------------------------
		//获取首页5个导航的列表
		async getFiveList() {
			const {
				data: { categoryList: res },
			} = await indexactionAPI();
			//console.log('five导航', res);
			//this.navList = res;
			this.fiveNavList = res;
			console.log('fiveNavList', this.fiveNavList);
			this.id = this.$route.query.id;
			this.getFiveItemContent();
			this.getCategoryList();
		},
		//获取首页5个导航的具体内容
		async getFiveItemContent() {
			const {
				data: { data: res },
			} = await currentactionAPI({
				id: this.id,
			});
			console.log('具体内容', res);
			this.currentNav = res;
			//this.active = res.show_index;
		},
		//点击5个导航事件
		changeFiveList(name) {
			//console.log('触发五个导航的点击事件');
			//console.log('name-1', this.fiveNavList[1]);
			this.id = this.fiveNavList[name].id;
			this.getCategoryList();
		},
	},
	created() {},
	mounted() {
		//获取具体分类的上部导航
		//获取首页五个分类的导航
		this.categoryNavList();
		this.getFiveList();
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			if (from.name !== 'home') {
				vm.isHome = false;
			}
		});
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
