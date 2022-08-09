<template>
	<div class="home">
		<!-- 搜索区域 -->
		<div class="search">
			<div class="search_location">
				<router-link to="/home/amap">{{
					$store.state.mapAddress.name || city.city
				}}</router-link>
			</div>
			<div class="search_btn">
				<searchBtn @click.native="toSearch"></searchBtn>
			</div>
		</div>
		<div class="top">
			<!-- 轮播区域 -->
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="#333">
				<van-swipe-item v-for="item in homeList.banner" :key="item.id">
					<img :src="item.image_url" class="img" />
				</van-swipe-item>
			</van-swipe>
			<!-- channel区域 -->
			<div class="channel">
				<ul class="channelList">
					<li
						v-for="item in homeList.channel"
						:key="item.id"
						@click="toList(item.id)"
						class="channelItem"
					>
						<img :src="item.icon_url" />
						<p>{{ item.name }}</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- 品牌制造 -->
		<div class="brand">
			<h3>品牌制造商直供</h3>
			<ul class="brand_list">
				<li
					class="brand_item"
					v-for="item in homeList.brandList"
					:key="item.id"
					@click="toMake(item.id)"
				>
					<img :src="item.new_pic_url" />
					<div class="brand_text">
						<p>{{ item.name }}</p>
						<p>{{ item.floor_price }}元起</p>
					</div>
				</li>
			</ul>
		</div>
		<!-- 新品首发 -->
		<div class="new_product">
			<div class="new_product_top" @click="toNewAndHot('new')">
				<p>新品首发</p>
				<van-button type="default">查看更多</van-button>
			</div>
			<div class="new_product_bottom">
				<ul class="new_product_list">
					<li
						class="new_product_item"
						v-for="item in homeList.newGoods"
						:key="item.id"
					>
						<img :src="item.list_pic_url" class="img" />
						<div class="new_product_describe">
							<h4>{{ item.name }}</h4>
							<p>{{ item.goods_brief }}</p>
							<p><span>¥</span>{{ item.retail_price }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 人气好物 -->
		<div class="new_product">
			<div class="new_product_top" @click="toNewAndHot('hot')">
				<p>人气推荐 好物精选</p>
				<van-button type="default">查看更多</van-button>
			</div>
			<div class="new_product_bottom">
				<ul class="new_product_list">
					<li
						class="new_product_item"
						v-for="item in homeList.hotGoods"
						:key="item.id"
					>
						<img :src="item.list_pic_url" class="img" />
						<div class="new_product_describe">
							<h4>{{ item.name }}</h4>
							<p>{{ item.goods_brief }}</p>
							<p><span>¥</span>{{ item.retail_price }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 精选部分 -->
		<div class="chosen">
			<div class="chosen_top">
				<span>专题精选</span>
				<van-icon name="arrow" />
			</div>
			<div class="chosen_bottom">
				<ul class="chosen_bottom_list">
					<li
						class="chosen_bottom_item"
						v-for="item in homeList.topicList"
						:key="item.id"
						@click="toDetails(item.id)"
					>
						<img :src="item.item_pic_url" />
						<h4>{{ item.title }}</h4>
						<p>{{ item.subtitle }}</p>
					</li>
				</ul>
			</div>
		</div>

		<!-- 好物部分 -->
		<div class="goods" v-for="item in homeList.newCategoryList" :key="item.id">
			<div class="goods_top">
				<h3>{{ item.name }}好物</h3>
			</div>
			<div class="goods_bottom">
				<ul class="goods_bottom_list">
					<li
						class="goods_bottom_item"
						v-for="gooditem in item.goodsList"
						:key="gooditem.id"
						@click="toGoodsDetails(gooditem.id)"
					>
						<img :src="gooditem.list_pic_url" />
						<div class="goods_bottom_text">
							<h4>{{ gooditem.name }}</h4>
							<p><span>¥</span>{{ gooditem.retail_price }}</p>
						</div>
					</li>
					<div class="goods_bottom_btn">
						<h3>{{ item.name }}好物</h3>
						<van-button round type="info" @click="toList(item.id)"
							>→</van-button
						>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
//导入搜索组件
import searchBtn from '@/views/home/search/searchBtn.vue';
import { index as indexAPI } from '@/api/home/index';
export default {
	name: 'Home',
	components: {
		searchBtn,
	},
	data() {
		return {
			homeList: {},
			//城市定位
			city: '',
		};
	},
	methods: {
		//获取首页数据列表
		async getHomeList() {
			// axios.get('http://shop.bufantec.com/bufan/index/index').then((res) => {
			// 	console.log(res);
			// 	this.homeList = res.data;
			// });
			// indexAPI().then((res) => {
			// 	console.log(res);
			// 	this.homeList = res.data;
			// });
			const { data: res } = await indexAPI();
			console.log(res);
			this.homeList = res;
		},
		//跳转到搜索组件
		toSearch() {
			this.$router.push('/home/serach');
		},
		//保存用户id
		saveUserId() {
			var userInfo = {
				openId: '13954416393',
				nickName: '孔艳',
				avatarUrl:
					'http://b-ssl.duitang.com/uploads/item/201710/17/20171017215814_fwPMQ.jpeg',
			};
			localStorage.setItem('userId', userInfo.openId);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
		},
		//获取当前定位信息
		getCity() {
			let _this = this;
			AMap.plugin('AMap.CitySearch', function () {
				var citySearch = new AMap.CitySearch();
				citySearch.getLocalCity(function (status, result) {
					if (status === 'complete' && result.info === 'OK') {
						// 查询成功，result即为当前所在城市信息
						//console.log(result);
						_this.city = result;
					}
				});
			});
		},
		//点击跳转到分类页
		toList(id) {
			//console.log(id);
			//将首页每个分类的ID传递给分类页面
			this.$router.push({ path: '/categroyGoodsList2', query: { id: id } });
		},
		//点击品牌制造商
		toMake(id) {
			this.$router.push({ path: '/brandMake', query: { id: id } });
		},
		//点击跳转到商品详情
		toGoodsDetails(id) {
			this.$router.push({ path: '/goodsdetails', query: { id: id } });
		},
		//跳转热门和最新详情页面
		toNewAndHot(name) {
			//console.log(name);
			this.$router.push({ path: '/newAndHot', query: { name } });
		},
		//跳转到专题详情
		toDetails(id) {
			this.$router.push({ path: '/subjectDetails', query: { id } });
		},
	},
	created() {},
	mounted() {
		//获取首页数据
		this.getHomeList();
		//保存用户信息
		this.saveUserId();
		//获取城市
		this.getCity();
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
