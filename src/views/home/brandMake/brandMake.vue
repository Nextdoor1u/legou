<template>
	<div class="brandmake">
		<navBar></navBar>
		<div class="brandmake_titie">
			<div class="brandmake_titie_img">
				<img :src="makeContent.new_pic_url" />
				<h3>{{ makeContent.name }}</h3>
			</div>
			<div class="brandmake_titie_text">
				<p>{{ makeContent.simple_desc }}</p>
			</div>
		</div>
		<div class="brandmake_content">
			<ul class="brandmake_content_list">
				<li
					class="brandmake_content_item"
					v-for="item in BrandList"
					:key="item.id"
				>
					<img :src="item.app_list_pic_url" />
					<p>{{ item.name }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
//引入顶部导航
import navBar from '@/components/navBar.vue';
//引入接口
import {
	detailaction as detailactionAPI,
	listaction as listactionAPI,
} from '@/api/home/index';
export default {
	name: 'brandmake',
	components: {
		navBar,
	},
	data() {
		return {
			//制造商的id
			makeId: this.$route.query.id,
			//标题信息
			makeContent: {},
			//详细信息
			BrandList: [],
		};
	},
	methods: {
		//获取供应商表头信息
		async getBrand() {
			const {
				data: { data: res },
			} = await detailactionAPI({
				id: this.makeId,
			});
			console.log(res);
			this.makeContent = res;
			this.getBrandList();
		},
		//获取供应商详细信息
		async getBrandList() {
			const {
				data: { data: res },
			} = await listactionAPI({
				page: this.makeContent.new_sort_order,
			});
			console.log(res);
			this.BrandList = res;
		},
	},
	created() {},
	mounted() {
		//获取供应商表头信息
		this.getBrand();
	},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
