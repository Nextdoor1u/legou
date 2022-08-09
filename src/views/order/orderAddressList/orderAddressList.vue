<template>
	<div class="orderList">
		<navBar></navBar>
		<!-- 渲染地址列表-->
		<div class="orderList_container">
			<van-address-list
				v-model="chosenAddressId"
				:list="list"
				default-tag-text="默认地址"
				@select="selectLocation"
				@add="onAdd"
				@edit="onEdit"
			/>
		</div>
	</div>
</template>
<script>
//引入顶部返回条
import navBar from '@/components/navBar.vue';
//引入接口
import { getListAction as getListActionAPI } from '@/api/order/index';
export default {
	name: 'orderAddressList',
	components: {
		navBar,
	},
	data() {
		return {
			//用户id
			id: localStorage.getItem('userId'),
			//地址列表
			LocationList: [],
			//渲染要用的列表
			list: [
				//默认导入的格式
				// {
				// 	id: '1',
				// 	name: '张三',
				// 	tel: '13000000000',
				// 	address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
				// 	isDefault: true,
				// },
			],
			//当前选中地址的id
			chosenAddressId: '',
		};
	},
	methods: {
		//获取收货列表
		async getLocationList() {
			const {
				data: { data: res },
			} = await getListActionAPI({ openId: this.id });
			//console.log('获取到的列表', res);
			this.LocationList = res;
			//将系统列表中的每一项数据以规定的格式遍历进数组
			res.forEach((el) => {
				//console.log('遍历得到', el);
				let isDefault = el.is_default ? true : false;
				let obj = {
					id: el.id,
					name: el.name,
					tel: el.mobile,
					address: `${el.address}${el.address_detail}`,
					isDefault,
				};
				this.list.push(obj);
			});
		},
		//点击添加地址
		onAdd() {
			this.$router.push('/addLocation');
		},
		//点击修改地址
		onEdit(item, index) {
			this.$router.push({ path: '/addLocation', query: { id: item.id } });
		},
		//切换选中的地址触发
		selectLocation(item, index) {
			//console.log(item.id);
			this.chosenAddressId = +item.id;
			//将选中的地址存储起来 便于退回去渲染数据
			localStorage.setItem('locationId', JSON.stringify(item.id));
		},
	},
	created() {},
	mounted() {
		this.chosenAddressId = +localStorage.getItem('addLocation');
		this.getLocationList();
	},
};
</script>
<style scoped lang=""></style>
