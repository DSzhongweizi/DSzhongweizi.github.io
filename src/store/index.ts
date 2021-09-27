import { createStore } from "vuex";
export default createStore({
  state: {
    asideMenu: [],
    categories: [
      {
        value: "前端",
        label: "前端",
        children: [
          {
            value: "网络协议",
            label: "网络协议",
          },
        ],
      },
      {
        value: "后端",
        label: "后端",
        children: [],
      },
      {
        value: "科学",
        label: "科学",
        children: [
          {
            value: "天文学",
            label: "天文学",
          },
        ],
      },
      {
        value: "历史",
        label: "历史",
        children: [],
      },
    ],
  },
  mutations: {
    setAsideMenu(state, data) {
      state.asideMenu = data;
    },
  },
  actions: {},
});
