<template>
	<div class="subject">
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<!-- 专题详情 -->
			<div class="subject_container">
				<ul class="subject_container_list">
					<li
						class="subject_container_item"
						v-for="item in subjectData"
						:key="item.id"
						@click="toDetails(item.id)"
					>
						<div class="subject_container_item_img">
							<img :src="item.scene_pic_url" />
						</div>
						<div class="subject_container_item_text">
							<h3>{{ item.title }}</h3>
							<p>{{ item.subtitle }}</p>
							<p>{{ item.price_info }}元起</p>
						</div>
					</li>
				</ul>
			</div>
		</van-list>
	</div>
</template>
<script>
//引入请求接口
import { listaction as listactionAPI } from '@/api/subject';
export default {
	name: 'subject',
	data() {
		return {
			loading: false,
			finished: false,
			//请求的页码
			page: 0,
			//专题列表数据
			subjectData: [],
			//列表数据的总页数,用于判断加载停止
			total: 2,
		};
	},
	methods: {
		//下滑请求其他页的数据
		onLoad() {
			//结束加载的判断条件
			if (this.page >= this.total) {
				this.finished = true;
				//console.log('停止加载');
			} else {
				//console.log(this.page, this.total);
				this.page++;
				this.getSubjectList();
			}
		},
		//请求专题列表
		async getSubjectList() {
			const { data } = await listactionAPI({ page: this.page });
			//console.log(data);
			//this.subjectData = res;
			// 拼接所有的数据
			this.subjectData = this.subjectData.concat(data.data);
			//将loading的值修改为false 则会加载
			this.loading = false;
			//设置数据的总页码
			this.total = data.total;
		},
		//跳转专题详情页
		toDetails(id) {
			this.$router.push({ path: '/subjectDetails', query: { id } });
		},
	},
	created() {},
	mounted() {},
};
</script>
<style scoped lang="less">
@import './style.less';
</style>
