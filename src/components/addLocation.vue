<template>
	<div class="addLocation">
		<!-- 顶部返回条 -->
		<navBar></navBar>
		<!-- 添加的主题内容 -->
		<div class="addLocation_cont">
			<van-address-edit
				:area-list="areaList"
				show-set-default
				:address-info="AddressInfo"
				:area-placeholder="`${AddressInfo.province}${AddressInfo.city}${AddressInfo.county}`"
				@save="onSave"
			/>
		</div>
	</div>
</template>
<script>
//引入顶部返回条
import navBar from '@/components/navBar.vue';
//到省市区默认数据
import { areaList } from '@vant/area-data';
//引入接口
import {
	saveAction as saveActionAPI,
	detailAction as detailActionAPI,
} from '@/api/order/index';
//引入轻提示
import { Toast } from 'vant';
export default {
	/* 
		orderlist 页面点击add不需要传值    
		点击edit需要传值
		addlocation页面判断是否有值
		离开add页面时销毁本地存储的数据 
  */
	name: 'addLocation',
	components: {
		navBar,
	},
	data() {
		return {
			//地区列表
			areaList,
			//设置默认收货信息
			AddressInfo: {
				name: '',
				tel: '',
				addressDetail: '',
				province: '',
				city: '',
				county: '',
				// name: '刘语晨',
				// tel: '13947819368',
				// addressDetail: '学而时习之不亦说乎',
				// province: '北京市',
				// city: '北京市',
				// county: '东城区',
			},
			//用户id
			id: localStorage.getItem('userId'),
			//获取地址的id
			locationId: this.$route.query.id,
			//地址的详细信息
		};
	},
	methods: {
		//点击保存地址
		async onSave(obj) {
			//obj包含表单信息
			console.log('obj', obj);
			//处理表单中的位置信息
			let address = `${obj.province} ${obj.city} ${obj.county}`;
			//console.log(address);
			//判断id是否存在 存在则是修改不存在则是添加

			const { data: res } = await saveActionAPI({
				address,
				addressId: this.locationId || '',
				checked: obj.isDefault,
				detailadress: obj.addressDetail,
				openId: this.id,
				telNumber: obj.tel,
				userName: obj.name,
			});
			console.log(res);
			res.data == true && Toast.success('添加成功');
			//this.$router.go(-1);
		},
		//跳转过来修改地址信息,主要是渲染带有原本数据的页面
		async changeLocation() {
			//如果地址中的id存在说明是修改,如果地址中的id不存在说明是新添加
			if (this.locationId) {
				//console.log('id存在');
				//通过id获取地址的详细信息
				const {
					data: { data: res },
				} = await detailActionAPI({ id: this.locationId });
				//console.log(res);
				//处理res的地址 将省市区分离出来
				//console.log(res.address.split(' '));
				let [province, city, county] = res.address.split(' ');
				let obj = {
					name: res.name,
					tel: res.mobile,
					addressDetail: res.address_detail,
					province,
					city,
					county,
				};
				this.AddressInfo = obj;
				//console.log(this.AddressInfo);
				// } else {
				// 	let obj = {
				// 		name: '',
				// 		tel: '',
				// 		addressDetail: '',
				// 		province: '',
				// 		city: '',
				// 		county: '',
				// 	};
			}
		},
	},
	created() {},
	mounted() {
		//先判断是否是首次进入还是进来修改地址,修改地址要给默认值
		this.changeLocation();
	},
};
</script>
<style scoped lang=""></style>
