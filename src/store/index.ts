import { createStore } from "vuex";
export default createStore({
  state: {
    asideMenu: [],
  },
  mutations: {
    setAsideMenu(state, data) {
      state.asideMenu = data;
    },
  },
  actions: {},
});
