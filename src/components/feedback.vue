<template>
	<div class="feedback">
		<navBar></navBar>
		<h3>意见与反馈</h3>
		<van-divider :style="{ borderColor: '#999', margin: '2px' }" />
		<van-field
			v-model="message"
			rows="4"
			autosize
			label="留言"
			show-word-limit
			border
			maxlength="150"
			type="textarea"
			placeholder="请填写你的意见和反馈"
		/>
		<van-divider :style="{ borderColor: '#999', margin: '2px' }" />
		<van-field v-model="tel" type="tel" label="手机号" border />
		<van-divider :style="{ borderColor: '#999', margin: '2px' }" />
		<van-button
			type="info"
			size="large"
			color="linear-gradient(135deg,#17ead9,#6078ea)"
			round
			@click="submit"
			>提交</van-button
		>
	</div>
</template>
<script>
//引入接口
import { submitAction as submitActionAPI } from '@/api/category/index';
//引入顶部导航栏
import navBar from '@/components/navBar.vue';
//引入轻提示
import { Toast } from 'vant';
export default {
	name: 'feedback',
	components: {
		navBar,
	},
	data() {
		return {
			//用户id
			id: localStorage.getItem('userId'),
			//用户名字
			userName: JSON.parse(localStorage.getItem('userInfo')).nickName,
			//输入框数据
			message: '',
			//电话数据
			tel: '',
		};
	},
	methods: {
		//提交意见
		async submit() {
			const { data: res } = await submitActionAPI({
				content: this.message,
				name: this.userName,
				openId: this.id,
				phone: this.tel,
			});
			Toast.success(res.data ? '提交成功' : '提交失败');
		},
	},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less">
.feedback {
	background-color: #fff;

	.van-button--large {
		width: 90%;
		margin-top: 10px;
	}
}
</style>
