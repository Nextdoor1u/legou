<template>
	<div class="goodsdetails">
		<navBar></navBar>

		<!-- 轮播图部分 -->
		<div class="swipe">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="#a88787">
				<van-swipe-item v-for="item in gallery" :key="item.id"
					><img :src="item.img_url" class="swipe_img"
				/></van-swipe-item>
			</van-swipe>
			<goodsEnsure></goodsEnsure>
		</div>
		<!-- 商品详情部分 -->
		<div class="goods_info">
			<div class="goods_info_title">
				<h3>{{ info.name }}</h3>
				<p>{{ info.goods_brief }}</p>
				<p>￥{{ info.retail_price }}</p>
			</div>
			<div class="goods_info_title_sku"></div>
		</div>
		<!-- 规格数量选择 -->
		<div class="goods_select_norms">
			<p>请选择规格数量</p>
			<span><van-icon name="arrow" size="20" /></span>
		</div>
		<!-- 商品参数 -->
		<div class="goods_parameter">
			<h3>商品参数</h3>
			<ul class="goods_parameter_list">
				<li
					class="goods_parameter_item"
					v-for="(item, index) in attribute"
					:key="index"
				>
					<span>{{ item.name }}</span>
					<p>{{ item.value }}</p>
				</li>
			</ul>
			<div v-html="info.goods_desc" class="goods_info"></div>
			<!-- 常见问题部分 -->
			<div class="goods_problem">
				<div class="goods_problem_title">
					<div class="goods_problem_line"></div>
					<h5>常见问题</h5>
					<div class="goods_problem_line"></div>
				</div>
				<ul class="goods_problem_container_list">
					<li
						class="goods_problem_container_item"
						v-for="item in issue"
						:key="item.id"
					>
						<p>{{ item.question }}</p>
						<p>{{ item.answer }}</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- 大家都在看部分 -->
		<div class="all_look_goods">
			<h4>大家都在看</h4>
			<ul class="all_look_goods_list">
				<li
					class="all_look_goods_item"
					v-for="item in productList"
					:key="item.id"
				>
					<img :src="item.list_pic_url" />
					<p>{{ item.name }}</p>
					<p>￥{{ item.retail_price }}</p>
				</li>
			</ul>
		</div>

		<!-- 底部商品导航部分 -->
		<div class="goods_buy">
			<van-goods-action>
				<van-goods-action-icon
					icon="star"
					:color="isCollect ? '#ff5000' : ''"
					@click="addCollect"
				/>
				<router-link :to="{ name: 'cart' }">
					<van-goods-action-icon icon="cart-o" :badge="this.cartList.length" />
				</router-link>

				<van-goods-action-button
					type="warning"
					text="点击添加购物车"
					@click="addCart"
				/>
				<van-goods-action-button
					type="danger"
					text="立即购买"
					@click="show = true"
				/>
			</van-goods-action>
		</div>

		<!-- 商品详情选择窗口 -->
		<van-sku
			v-model="show"
			:sku="sku"
			:goods="goods"
			:goods-id="id"
			@buy-clicked="onBuyClicked"
			@add-cart="onAddCartClicked"
		/>
	</div>
</template>
<script>
//引入顶部导航组件
import navBar from '@/components/navBar.vue';
//引入商品保障组件
import goodsEnsure from '@/components/goodsEnsure.vue';
//引入提示窗
import { Toast } from 'vant';
//引入商品详情, 收藏接口
import {
	detailaction as detailactionAPI,
	listAction as listActionAPI,
	addcollect as addcollectAPI,
	cartList as cartListAPI,
	addCart as addCartAPI,
} from '@/api/goodsList/index';
export default {
	name: 'goodsdetails',
	components: {
		navBar,
		goodsEnsure,
	},
	data() {
		return {
			//当前商品的id
			id: '',
			//当前用用户的id
			openid: localStorage.getItem('userId'),
			//轮播图图片
			gallery: [],
			//商品属性参数
			attribute: [],
			//商品详情
			info: {},
			//商品保障
			issue: [],
			//其他商品介绍
			productList: [],
			//商品规格选择弹窗
			show: false,
			//当前商品是否被收藏
			isCollect: false,
			//购物车列表
			cartList: [],
			//购买商品的数量
			buyAmount: '',
			//商品详情选择配置
			sku: {
				tree: [],
				price: '', // 默认价格（单位元）,
				stock_num: 0, // 商品总库存
				none_sku: true, // 是否无规格商品
			},
			//弹出配置详情的图片
			goods: {
				// 默认商品 sku 缩略图
				picture: '',
			},
		};
	},
	methods: {
		//获取当前商品的详情
		async getGoodsDetails() {
			//获取路径里query的id
			this.id = this.$route.query.id;
			const { data: res } = await detailactionAPI({
				id: this.id,
				openId: this.openid,
			});
			//console.log(res);
			this.gallery = res.gallery;
			this.attribute = res.attribute;
			this.info = res.info;
			this.issue = res.issue;
			this.productList = res.productList;
			this.goods.picture = res.info.primary_pic_url;
			this.sku.price = res.info.retail_price;
			this.sku.stock_num = res.info.goods_number;
		},
		//点击收藏事件
		async addCollect() {
			const res = await addcollectAPI({
				goodsId: this.id,
				openId: this.openid,
			});
			this.getCollectList();
		},
		//获取收藏列表
		async getCollectList() {
			const {
				data: { collectGoodsList: res },
			} = await listActionAPI({
				openId: this.openid,
			});
			this.isCollect = res.some((el) => el.id == this.id);
		},
		//获取购物车列表
		async getCartList() {
			const {
				data: { data: res },
			} = await cartListAPI({
				openId: this.openid,
			});
			//console.log('购物车', res);
			this.cartList = res;
		},
		//点击加入购物车
		addCart() {
			this.show = true;
			//console.log(this.goods.price);
		},
		//添加购物车列表
		async addCartList(data) {
			const { data: res } = await addCartAPI({
				goodsId: this.id,
				number: data,
				openId: this.openid,
			});
			//console.log('添加购车成功', res.data);
			res.data == 'success' && Toast.success('添加购物车成功');
			this.getCartList();
		},
		//点击加入购物车按钮的事件
		onAddCartClicked(obj) {
			this.addCartList(obj.selectedNum);
			//this.addCartList();
			this.show = false;
		},
		//点击购买的事件
		onBuyClicked(obj) {
			//console.log(obj);
			//存储商品的信息
			//*自带的数据键名和原生的不一样修改名字发送过去还是用相同的方式渲染
			//*商品的id和购买的数量传递过去,将购买的数量通过query传递
			
			localStorage.setItem('goodsData', JSON.stringify(obj));
			//将购买的数量赋值
			this.buyAmount = obj.selectedNum;
			//console.log([this.buyAmount], [this.info.retail_price]);
			//	console.log(obj);
			//通过query传入图片的地址
			this.$router.push({
				path: '/order',
				query: {
					url: this.info.list_pic_url,
					name: this.info.name,
					total: this.sumNumber,
				},
			});
		},
	},
	computed: {
		sumNumber() {
			return this.buyAmount * this.info.retail_price * 100;
		},
	},
	created() {},
	mounted() {
		//获取商品所有的数据
		this.getGoodsDetails();
		//获取当前的收藏列表
		this.getCollectList();
		//获取购物车列表
		this.getCartList();
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
