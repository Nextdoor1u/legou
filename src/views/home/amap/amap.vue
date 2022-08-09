<template>
	<div>
		<navBar></navBar>
		<div class="serach">
			<van-search
				v-model.trim="value"
				placeholder="请输入搜索关键词"
				@input="getSearchAddress"
			/>
			<ul>
				<li v-for="item in mapTips" :key="item.id" @click="toHome(item)">
					{{ item.name }} 地址:{{ item.address }}
				</li>
			</ul>
		</div>
		<div id="container"></div>
	</div>
</template>
<script>
//引入顶部导航组件
import navBar from '@/components/navBar.vue';
export default {
	name: 'amap',
	components: {
		navBar,
	},
	data() {
		return {
			value: '',
			city: '',
			//地图搜索的结果
			mapTips: [],
		};
	},
	methods: {
		//获取城市地图
		getCityMap() {
			//首次进入没有坐标位置,先用默认的位置
			if (this.$store.state.mapAddress.name) {
				var map = new AMap.Map('container', {
					zoom: 11, //级别
					center: [
						this.$store.state.mapAddress.location.lng,
						this.$store.state.mapAddress.location.lat,
					], //中心点坐标
					viewMode: '3D', //使用3D视图
				});
				//坐标位置添加箭头
				var marker = new AMap.Marker({
					position: [
						this.$store.state.mapAddress.location.lng,
						this.$store.state.mapAddress.location.lat,
					], //位置
				});
				map.add(marker); //添加到地图
			} else {
				//console.log('首次进入');
				var map = new AMap.Map('container', {
					zoom: 10,
				});
			}
		},
		//获取附近的地点
		getSearchAddress() {
			var _this = this;
			AMap.plugin('AMap.AutoComplete', function () {
				var autoOptions = {
					//city 限定城市，默认全国
					city: _this.city,
				};
				// 实例化AutoComplete
				var autoComplete = new AMap.AutoComplete(autoOptions);
				// 根据关键字进行搜索
				autoComplete.search(_this.value, function (status, result) {
					// 搜索成功时，result即是对应的匹配数据
					//console.log(result);
					_this.mapTips = result.tips;
				});
			});
		},
		//获取当前城市
		getCity() {
			var _this = this;
			//获取当前城市
			AMap.plugin('AMap.CitySearch', function () {
				var citySearch = new AMap.CitySearch();
				citySearch.getLocalCity(function (status, result) {
					if (status === 'complete' && result.info === 'OK') {
						// 查询成功，result即为当前所在城市信息
						//console.log(result);
						_this.city = result.city;
					}
				});
			});
		},
		//修改vuex中的地址
		toHome(item) {
			this.$store.commit('changemapAddress', item);
			this.$router.go(-1);
		},
	},
	created() {},
	mounted() {
		this.getCityMap();
		this.getCity();
	},
};
</script>
<style scoped lang="less">
#container {
	width: 100%;
	height: 400px;
}
</style>
