<template>
	<div class="order">
		<navBar></navBar>
		<!-- 添加/选择地址 -->
		<div class="add_address">
			<!-- 顶部装饰 -->
			<div class="add_address_decorate"></div>
			<!-- 地址部分 -->
			<div class="add_address_container">
				<p @click="addLocation" v-if="!AddressList.length">点击添加地址</p>
				<p @click="selectLocation" v-if="!locationIdData.name">点击选择地址</p>
				<!-- 渲染选择的地址 -->
				<div
					class="add_address_container_data"
					v-if="locationIdData.name"
					@click="changeData"
				>
					<div class="add_address_container_data_name">
						<p>{{ locationIdData.name }}</p>
					</div>
					<div class="add_address_container_data_other">
						<div class="add_address_container_data_other_left">
							<p>{{ locationIdData.mobile }}</p>
							<p>
								{{ locationIdData.address }} {{ locationIdData.address_detail }}
							</p>
						</div>
						<div class="add_address_container_data_other_right">
							<van-icon name="arrow" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 商品价格部分 -->
		<div class="order_goods">
			<ul class="order_goods_list">
				<li class="order_goods_item">
					<p>商品合计</p>
					<p>￥{{ sumNumber / 100 }}</p>
				</li>
				<li class="order_goods_item">
					<p>运费</p>
					<p>免运费</p>
				</li>
				<li class="order_goods_item">
					<p>优惠券</p>
					<p>暂无</p>
				</li>
			</ul>
		</div>
		<!-- 商品购买信息汇总 -->
		<orderGooodsList v-if="isCart">
			<!-- 购物车跳转 -->
			<div
				class="order_goods_container"
				v-for="item in goodsInfo"
				:key="item.id"
				slot="cart"
			>
				<div class="order_goods_container_img">
					<img :src="item.list_pic_url" />
				</div>
				<div class="order_goods_container_text">
					<div class="order_goods_container_text_left">
						<p>{{ item.goods_name }}</p>
						<p>￥{{ item.retail_price }}</p>
					</div>
					<div class="order_goods_container_text_right">×{{ item.number }}</div>
				</div>
			</div>
		</orderGooodsList>
		<orderGooodsList v-if="!isCart">
			<!-- 点击立即购买跳转 -->
			<div class="order_goods_container" slot="buy">
				<div class="order_goods_container_img">
					<img :src="imgURL" />
				</div>
				<div class="order_goods_container_text">
					<div class="order_goods_container_text_left">
						<p>{{ goodsName }}</p>
						<p>￥{{ goodsData.selectedSkuComb.price / 100 }}</p>
					</div>
					<div class="order_goods_container_text_right">
						×{{ goodsData.selectedNum }}
					</div>
				</div>
			</div>
		</orderGooodsList>
		<!-- 提交订单栏 -->
		<div class="order_submit">
			<van-submit-bar
				:price="+sumNumber"
				button-text="支付"
				button-color="#1998fb"
				@submit="onSubmit"
			/>
		</div>
	</div>
</template>
<script>
//*动态显示商品列表 区别是 购物车跳转还是立即购买跳转 通过beforeRouteEnter来进行赋值进行隐藏和判断
//引入轻提示
import { Toast } from 'vant';
// 引入导航
import navBar from '@/components/navBar.vue';
//引入商品购买详情的组件
import orderGooodsList from './orderGoodsList/orderGooodsList.vue';
//引入接口
import {
	getListAction as getListActionAPI,
	detailAction as detailActionAPI,
} from '@/api/order/index';
//引入商品相关的接口
import { detailaction as detailactionAPI } from '@/api/goodsList/index';
export default {
	name: 'order',
	components: {
		//顶部导航
		navBar,
		//商品购买详情
		orderGooodsList,
	},
	data() {
		return {
			//购买的商品的数量和价格
			goodsData: JSON.parse(localStorage.getItem('goodsData')),
			//用户id
			id: localStorage.getItem('userId'),
			//点击购买的商品id
			goodsId: JSON.parse(localStorage.getItem('goodsData')).goodsId,
			//收货地址列表
			AddressList: [],
			//选中收货地址的id
			locationId: localStorage.getItem('locationId'),
			//选中地址的详细信息
			locationIdData: {},
			//购买的商品的图片地址
			imgURL: this.$route.query.url,
			//商品的名称
			goodsName: this.$route.query.name,
			//购物车购买商品明细
			goodsInfo: [],
			//判断是否是购物车跳转
			isCart: null,
		};
	},
	methods: {
		//!获取地址列表
		async getAddressList() {
			const {
				data: { data: res },
			} = await getListActionAPI({ openId: this.id });
			//console.log(res);
			this.AddressList = res;
		},
		//!点击添加地址
		addLocation() {
			//跳转到添加页面
			this.$router.push('/addLocation');
		},
		//!点击选择地址
		selectLocation() {
			//跳转到选择地址页面
			this.$router.push('/orderList');
		},
		//!获取当前选中的地址
		async getAddress() {
			//判断当前地址id是否存在 ,
			if (this.locationId) {
				//存在则是从地址列表页面选择回来的
				const {
					data: { data: res },
				} = await detailActionAPI({
					id: this.locationId,
				});
				//console.log('res', res);
				this.locationIdData = res;
			} else {
				//不存在这代表是第一次进入页面
				console.log('首次进入页面');
			}
		},
		//!获取商品详情
		async getGoodsData() {
			const {
				data: { info: res },
			} = await detailactionAPI({
				id: this.goodsId,
				openId: this.id,
			});
			console.log('未修改前', res);
			//!修改一下其中的  name 属性 可以直接遍历得到结果
			res['goods_name'] = res.name;
			delete res['name'];
			this.goodsInfo.push(res);
			console.log('goodsInfo', res);
		},
		//!点击选择其他地址
		changeData() {
			localStorage.setItem('addLocation', this.locationId);
			this.$router.push('/orderAddressList');
		},
		//!提交订单按钮
		onSubmit() {
			Toast.success('支付功能还在测试中😅😅😅');
		},
	},
	computed: {
		sumNumber() {
			return this.$route.query.total;
		},
	},
	created() {},
	mounted() {
		//获取收货地址列表
		this.getAddressList();
		//获取当前选中的收货地址
		this.getAddress();
		//获取购物车跳转的商品详情
		this.goodsInfo = JSON.parse(localStorage.getItem('buyGoods'));
		//获取点击立即购买的商品的信息
		console.log('this.goodsData', this.goodsData);
		this.goodsData = JSON.parse(localStorage.getItem('goodsData'));
	},
	beforeRouteEnter(to, from, next) {
		console.log('进入了路由');
		next((vm) => {
			console.log(from);
			if (from.name == 'goodsdetails') {
				vm.isCart = false;
			}
			if (from.name == 'cart') {
				vm.isCart = true;
			}
		});
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
