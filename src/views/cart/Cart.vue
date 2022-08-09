<template>
	<div class="cart">
		<goodsEnsure></goodsEnsure>
		<!-- 购物车详细内容 -->
		<div class="cart_content">
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<ul class="cart_content_list">
					<li
						class="cart_content_item"
						v-for="item in cartList"
						:key="item.id"
						@touchstart="gtouchstart(item)"
						@touchmove="gtouchmove()"
						@touchend="showDeleteButton(item)"
					>
						<div class="cart_content_item_btn">
							<van-checkbox
								v-model="item.isChecked"
								checked-color="#e60012"
							></van-checkbox>
						</div>
						<div class="cart_content_item_text">
							<div class="cart_content_item_text_left">
								<div class="cart_content_item_text_left_img">
									<img :src="item.list_pic_url" />
								</div>
								<div class="cart_content_item_text_left_describe">
									<p>{{ item.goods_name }}</p>
									<p>￥{{ item.retail_price }}</p>
								</div>
							</div>
							<div class="cart_content_item_text_right">
								× {{ item.number }}
							</div>
						</div>
					</li>
				</ul>
			</van-list>
		</div>

		<!-- 底部提交订单按钮 -->
		<div class="cart_content_submit">
			<van-submit-bar
				:price="allSumPrice || 0"
				button-text="提交订单"
				@submit="onSubmit"
			>
				<van-checkbox v-model="checked" checked-color="#e60012"
					>全选</van-checkbox
				>
			</van-submit-bar>
		</div>
	</div>
</template>
<script>
//引入弹出框
import { Dialog, Toast } from 'vant';
//引入商品保障部分
import goodsEnsure from '@/components/goodsEnsure.vue';
///引入购物车相关接口
import {
	cartList as cartListAPI,
	deleteAction as deleteActionAPI,
} from '@/api/goodsList/index';
export default {
	name: 'Cart',
	components: {
		goodsEnsure,
		[Dialog.Component.name]: Dialog.Component,
	},
	data() {
		return {
			//是否处于加载状态，加载过程中不触发load事件
			loading: true,
			//是否已加载完成，加载完成后不再触发load事件
			finished: true,
			//购物车列表数据
			cartList: [],
			//用户id
			id: localStorage.getItem('userId'),
			//删除的商品的id
			removeId: '',
		};
	},
	methods: {
		//购物车加载完后的回调函数
		onLoad() {},
		//获取购物车列表
		async getCartList() {
			const {
				data: { data: res },
			} = await cartListAPI({ openId: this.id });
			//console.log(res);
			//给每一项添加一个是否选择的数据
			res.forEach((el) => {
				el.isChecked = false;
			});
			//console.log('处理后', res);
			this.cartList = res;
		},
		//结算购物车
		onSubmit() {
			//跳转到结算页面
			this.$router.push({ path: '/order', query: { total: this.allSumPrice } });
			//将需要结算的数据存储到本地
			let newArr = this.cartList.reduce((pre, next) => {
				if (next.isChecked) {
					return pre.concat(next);
				}
				return pre;
			}, []);
			//console.log(newArr);
			localStorage.setItem('buyGoods', JSON.stringify(newArr));
		},
		//删除购物车中的商品
		async removeCartGodds() {
			const { data: res } = await deleteActionAPI({
				id: this.removeId,
			});
			if (res.data === true) {
				Toast('删除成功');
			}
			this.getCartList();
		},
		//todo-----------------------------------------------------------
		//长按事件（起始）
		gtouchstart(item) {
			//console.log(item);
			this.removeId = item.id;
			var self = this;
			this.timeOutEvent = setTimeout(function () {
				self.longPress();
			}, 500); //这里设置定时器，定义长按500毫秒触发长按事件
			return false;
		},
		//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		showDeleteButton(item) {
			clearTimeout(this.timeOutEvent); //清除定时器
			if (this.timeOutEvent != 0) {
				//这里写要执行的内容（如onclick事件）
				console.log('点击但未长按');
			}
			return false;
		},
		//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
		gtouchmove() {
			clearTimeout(this.timeOutEvent); //清除定时器
			this.timeOutEvent = 0;
		},
		//真正长按后应该执行的内容
		longPress() {
			this.timeOutEvent = 0;
			//执行长按要执行的内容，如弹出菜单
			console.log('长按');
			Dialog.confirm({
				title: '删除购物车商品',
				message: '是否要删除该商品',
			})
				.then(() => {
					this.removeCartGodds();
				})
				.catch(() => {
					Toast('取消删除');
				});
		},
	},
	computed: {
		//计算总价
		allSumPrice() {
			let num = this.cartList.reduce((pre, next) => {
				if (next.isChecked) {
					return (pre += next.number * next.retail_price);
				}
				return pre;
			}, 0);
			return num * 100;
		},
		//全选和反选
		checked: {
			get() {
				return this.cartList.every((el) => el.isChecked);
			},
			set(val) {
				return this.cartList.forEach((el) => (el.isChecked = val));
			},
		},
	},
	created() {},
	mounted() {
		//获取购物车列表
		this.getCartList();
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
