import { createStore } from "vuex";
export default createStore({
  state: {
    asideMenu: [],
  },
  mutations: {
    setAsideMenu(state, data) {
      console.log(data);
      state.asideMenu = data;
    },
  },
  actions: {},
});
