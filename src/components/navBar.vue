<template>
	<div class="nav">
		<van-nav-bar
			title="不凡乐购"
			left-text="返回"
			left-arrow
			fixed
			placeholder
			@click-left="onClickLeft"
		/>
	</div>
</template>
<script>
export default {
	name: 'navBar',
	data() {
		return {};
	},
	methods: {
		//点击返回
		onClickLeft() {
			this.$router.go(-1);
		},
	},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less"></style>
