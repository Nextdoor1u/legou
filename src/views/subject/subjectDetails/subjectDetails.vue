<template>
	<div class="subjectDetails">
		<navBar></navBar>
		<div class="fixed">
			<div class="subjectDetails_img">
				<img
					src="//yanxuan.nosdn.127.net/75c55a13fde5eb2bc2dd6813b4c565cc.jpg"
				/>
				<img
					src="//yanxuan.nosdn.127.net/e27e1de2b271a28a21c10213b9df7e95.jpg"
				/>
				<img
					src="//yanxuan.nosdn.127.net/9d413d1d28f753cb19096b533d53418d.jpg"
				/>
				<img
					src="//yanxuan.nosdn.127.net/64b0f2f350969e9818a3b6c43c217325.jpg"
				/>
				<img
					src="//yanxuan.nosdn.127.net/79ee021bbe97de7ecda691de6787241f.jpg"
				/>
			</div>
			<div class="subjectDetails_content">
				<h3>专题推荐</h3>
				<ul class="subjectDetails_content_list">
					<li
						class="subjectDetails_content_item"
						v-for="item in list"
						:key="item.id"
					>
						<div class="subjectDetails_content_item_img">
							<img :src="item.scene_pic_url" />
						</div>
						<p>{{ item.title }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
//引入顶部导航
import navBar from '@/components/navBar.vue';
//引入接口
import { detailaction as detailactionAPI } from '@/api/subject/index';
export default {
	name: 'subjectDetails',
	components: {
		navBar,
	},
	data() {
		return {
			//分类详情接口参数
			page: this.$route.query.id,
			//详情数据
			list: [],
		};
	},
	methods: {
		//获取分类页详情
		async getDetails() {
			const {
				data: { recommendList: res },
			} = await detailactionAPI({
				page: this.page,
			});
			console.log(res);
			this.list = res;
		},
	},
	created() {},
	mounted() {
		//获取分类页详情
		this.getDetails();
	},
};
</script>
<style scoped lang="less">
.subjectDetails {
	.subjectDetails_img {
		img {
			width: 100%;
		}
	}
	.subjectDetails_content {
		h3 {
			padding: 10px;
		}
		.subjectDetails_content_list {
			display: flex;
			flex-wrap: wrap;
			.subjectDetails_content_item {
				width: 100%;
				.subjectDetails_content_item_img {
					img {
						width: 100%;
					}
				}
			}
		}
	}
}
</style>
