import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		mapAddress: {},
	},
	getters: {},
	mutations: {
		changemapAddress(state, val) {
			state.mapAddress = val;
		},
	},
	actions: {},
	modules: {},
});
