<template>
	<div>
		<van-search v-model="value" placeholder="搜索商品" />
	</div>
</template>
<script>
export default {
	name: 'searchBtn',
	data() {
		return {
			value: '',
		};
	},
	methods: {},
	created() {},
	mounted() {},
};
</script>
<style scoped></style>
