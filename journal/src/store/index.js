import Vuex from "vuex";

const store = new Vuex.Store({
  state: { userName: null, isNavOpen: false },
  getters: {
    getUser: state => {
      return state.userName;
    }
  },
  mutations: {
    toggleNav: state => {
      state.isNavOpen = !state.isNavOpen;
    },
    setUser: (state, name) => {
      console.log("Im here");
      state.userName = name;
    }
  }
});

export default store;
