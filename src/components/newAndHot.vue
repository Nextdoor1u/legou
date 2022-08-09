<template>
	<div class="newAndHot">
		<navBar></navBar>
		<img
			src="http://imgservice.suning.cn/uimg1/b2c/image/xFZjvb3nimz9UKf2S16p6A.jpg_800w_800h_4e"
			class="newAndHot-img"
		/>
		<div class="newAndHot_content">
			<div class="newAndHot_content_title">
				<div :class="{ active: whoShow == 'all' }" @click="clickAll">综合</div>
				<div class="newAndHot_content_title_price" @click="clickPrice">
					<p :class="{ active_price: whoShow == 'price' }">价格</p>
					<div class="newAndHot_content_title_price_arrow">
						<van-icon
							name="arrow-up"
							:class="{ arrowActive: order == 'asc' }"
						/>
						<van-icon
							name="arrow-down"
							:class="{ arrowActive: order == 'desc' }"
						/>
					</div>
				</div>
				<div>分类</div>
			</div>
			<div class="newAndHot_content_container">
				<ul class="newAndHot_content_container_list">
					<li
						class="newAndHot_content_container_item"
						v-for="item in list"
						:key="item.id"
						@click="toDetails(item.id)"
					>
						<div class="newAndHot_content_container_item_img">
							<img :src="item.list_pic_url" />
						</div>
						<div class="newAndHot_content_container_item_text">
							<h4>{{ item.name }}</h4>
							<p>￥{{ item.retail_price }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
// 引入顶部导航组件
import navBar from '@/components/navBar.vue';
//引入内容接口
import { goodsList as goodsListAPI } from '@/api/home/index';
export default {
	name: 'newAndHot',
	components: {
		navBar,
	},
	data() {
		return {
			//页面列表
			list: [],
			//标签的颜色
			whoShow: 'all',
			//排序方式,
			order: '',
		};
	},
	methods: {
		//获取页面列表
		async getList() {
			const {
				data: { data: res },
			} = await goodsListAPI({
				isHot: this.$route.query.name == 'hot' ? '1' : '',
				isNew: this.$route.query.name == 'hot' ? '' : '1',
				order: this.order,
			});
			console.log(res);
			this.list = res;
		},
		//点击综合
		clickAll() {
			this.order = '';
			this.whoShow = 'all';
		},
		//点击价格
		clickPrice() {
			this.whoShow = 'price';
			//判断是否是第一次点击 第一次店家order为空
			if (!this.order) {
				//console.log('执行了第一次点击');
				this.order = 'asc';
			}
			this.order = this.order == 'asc' ? 'desc' : 'asc';
			this.getList();
			//console.log('order=>', this.order);
		},
		//点击跳转商品详情页面
		toDetails(id) {
			this.$router.push({ path: '/goodsdetails', query: { id } });
		},
	},
	created() {},
	mounted() {
		//获取内容列表
		this.getList();
	},
};
</script>
<style scoped lang="less">
.newAndHot {
	.newAndHot-img {
		width: 100%;
		height: 200px;
	}
	.newAndHot_content {
		.newAndHot_content_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			div {
				flex: 1;
				&.active {
					color: #c12c1f;
				}
				&.newAndHot_content_title_price {
					display: flex;
					align-items: center;
					.active_price {
						color: #c12c1f;
					}
					p {
						text-align: right;
						flex: 3;
					}
					.newAndHot_content_title_price_arrow {
						display: flex;
						flex-direction: column;
						text-align: left;
						flex: 3;
						.arrowActive {
							color: #c12c1f;
						}
					}
				}
			}
		}
		.newAndHot_content_container {
			.newAndHot_content_container_list {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				.newAndHot_content_container_item {
					width: 48%;
					.newAndHot_content_container_item_img {
						img {
							width: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
