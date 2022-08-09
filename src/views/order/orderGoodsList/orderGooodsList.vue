<template>
	<div class="order_goods_list">
		<slot name="cart"></slot>
		<slot name="buy"></slot>
	</div>
</template>
<script>
export default {
	name: 'orderGooodsList',
	data() {
		return {};
	},
	methods: {},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less">
//商品购买信息汇总
.order_goods_container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	background-color: #fff;
	padding: 15px;
	.order_goods_container_img {
		flex: 1;
		img {
			width: 100%;
		}
	}
	.order_goods_container_text {
		flex: 4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.order_goods_container_text_left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}
}
</style>
