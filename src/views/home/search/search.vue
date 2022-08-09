<template>
	<div class="search">
		<!-- 导航 -->
		<navBar></navBar>
		<!-- 搜索输入框 -->
		<form action="/">
			<van-search
				v-model.trim.lazy="value"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="onCancel"
				@input="getSearchList"
				@click="getSearchList"
			/>
		</form>
		<!-- 搜索提示框 -->
		<div class="searchCue" v-if="!showData.name">
			<ul class="searchCue_list">
				<li
					class="searchCue_item"
					v-for="item in cueData"
					:key="item.id"
					@click="showGoodsList(item)"
				>
					{{ item.name }}
				</li>
			</ul>
		</div>
		<!-- 搜索框商品展示 -->
		<div class="showGoods" v-if="showData.name">
			<div class="showGoods_top">
				<!-- 综合标识为0,价格为1,分类为2 -->
				<span @click="sign = 0" :class="{ active: sign == 0 }">综合</span>
				<div class="showGoods_pic">
					<p @click="orderChange" :class="{ active: sign == 1 }">价格</p>
					<div class="arrow">
						<van-icon name="arrow-up" :class="{ current: order == 'asc' }" />
						<van-icon name="arrow-down" :class="{ current: order == 'desc' }" />
					</div>
				</div>
				<span @click="sign = 2" :class="{ active: sign == 2 }">分类</span>
			</div>
			<div class="showGoods_bottom">
				<img :src="showData.list_pic_url" />
				<p>{{ showData.name }}</p>
				<p>￥{{ showData.retail_price }}</p>
			</div>
		</div>
		<!-- 历史搜索 -->
		<div class="history" v-if="!cueData.length">
			<div class="history_top">
				<h4>历史搜索</h4>
				<van-icon name="delete-o" size="14" @click="emptyHistory" />
			</div>
			<div class="history_bootm">
				<ul class="history_bootm_list">
					<li
						class="history_bootm_item"
						v-for="item in historyData"
						:key="item.id"
					>
						{{ item.keyword }}
					</li>
				</ul>
			</div>
		</div>
		<!-- 热门搜索部分 -->
		<div class="hot_search" v-if="!cueData.length">
			<h4>热门搜索</h4>
			<ul class="hot_search_list">
				<li
					class="hot_search_item"
					v-for="item in hotSearch"
					:key="item.id"
					:class="{ active: item.is_hot }"
				>
					{{ item.keyword }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import navBar from '@/components/navBar.vue';
import { Toast } from 'vant';
//引入请求的方法
import {
	indexaction as indexactionAPI,
	helperaction as helperactionAPI,
	addhistoryaction as addhistoryactionAPI,
	clearhistoryAction as clearhistoryActionAPI,
} from '@/api/serach/index';
export default {
	name: 'searchVue',
	components: {
		navBar,
	},
	data() {
		return {
			//搜索内容
			value: '',
			//本地存储的id
			openId: localStorage.getItem('userId'),
			//热门搜索
			hotSearch: [],
			//历史搜索的数据
			historyData: [],
			//搜索接口配置项
			order: '',
			//搜索提示框数据
			cueData: [],
			//搜索点击后展示的数据
			showData: {},
			//分类 价格排序 综合的标识
			sign: 0,
			//箭头的相反显示
			arrowFlag: true,
		};
	},
	methods: {
		//点击搜索事件
		onSearch(val) {
			Toast(val);
		},
		//点击取消事件
		onCancel() {
			Toast('取消');
		},
		//获取热门搜索和历史记录
		getHotAndHistory() {
			indexactionAPI({
				openId: this.openId,
			}).then((res) => {
				console.log(res);
				const { historyData, hotKeywordList } = res.data;
				this.hotSearch = hotKeywordList;
				this.historyData = historyData;
			});
		},
		//获取相关搜索的列表
		getSearchList() {
			this.showData = {};
			helperactionAPI({
				keyword: this.value,
				order: this.order,
			}).then((res) => {
				//console.log(res.data.keywords);
				this.cueData = res.data.keywords;
			});
		},
		//点击搜索列表显示详情
		showGoodsList(item) {
			//console.log(item);
			this.showData = item;
			this.addKeyWord();
		},
		//点击价格更改排序
		orderChange() {
			this.sign = 1;
			this.order = this.order == 'asc' ? 'desc' : 'asc';
		},
		//提交关键字到数据库
		addKeyWord() {
			addhistoryactionAPI({
				keyword: this.value,
				openId: this.openId,
			}).then((res) => {
				console.log('添加成功', res);
			});
		},
		//清空搜索记录
		emptyHistory() {
			clearhistoryActionAPI({
				openId: this.openId,
			}).then((res) => {
				console.log(res);
				this.getHotAndHistory();
			});
		},
	},
	created() {},
	mounted() {
		this.getHotAndHistory();
	},
};
</script>
<style scoped lang="less">
@import './search.less';
</style>
