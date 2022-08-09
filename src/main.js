import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
Vue.config.productionTip = false;
//vant组件按需加载
import vant from '@/plugins/vant';
Vue.prototype.$bus = new Vue();
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
