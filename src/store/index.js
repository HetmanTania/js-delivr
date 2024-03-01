import { createStore } from 'vuex'
import axios from 'axios';
import { REGISTRY_URL, JSDELIVR_URL, COUNT_REQUESTED_PACKAGES } from '@/constants.js';

export default createStore({
  state: {
    currentPackage: {},
    packages: [],
    totalCountPackages: 0,
  },
  getters: {
    getPackages(state) {
      return state.packages;
    },
    getTotalCountPackages(state) {
      return state.totalCountPackages;
    },
    getCurrentPackage(state) {
      return state.currentPackage
    }
  },
  mutations: {
    setPackages(state, packages) {
      state.packages = [...packages];
    },
    setTotalCountPackages(state, total) {
      state.totalCountPackages = total;
    },
    setCurrentPackage(state, thePackage) {
      state.currentPackage = thePackage;
    }
  },
  actions: {
    async requestSearchPackagesByName({commit}, {namePackages, from = 0}) {
      try {
        const result = await axios(`${REGISTRY_URL}/search?text=${namePackages}&size=${COUNT_REQUESTED_PACKAGES}&from=${from}`);
        if(result.data?.objects){
          commit('setPackages', result.data.objects);
          commit('setTotalCountPackages', result.data.total);
        }
      } catch (error) {
        console.log(error);
        commit('setPackages', []);
        commit('setTotalCountPackages', 0);
      }
    },
    async requestPackage({commit}, namePackage) {
      try {
        const result = await axios(`${JSDELIVR_URL}/${namePackage}`);
        if(result.data?.name) {
          commit('setCurrentPackage', result.data);
        }
      } catch (error) {
        console.log(error);
        commit('setCurrentPackage', {});
      }
    }
  },

})
