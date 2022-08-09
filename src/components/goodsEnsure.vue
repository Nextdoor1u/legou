<template>
	<div class="goods_ensure">
		<p><span>○</span> 30天无忧退货</p>
		<p><span>○</span> 48小时快速退款</p>
		<p><span>○</span> 满88元包邮</p>
	</div>
</template>
<script>
export default {
	name: 'goodsEnsure',
	data() {
		return {};
	},
	methods: {},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less">
.goods_ensure {
	display: flex;
	justify-content: space-between;
	padding: 0 5px;
	p {
		span {
			color: red;
		}
	}
}
</style>
