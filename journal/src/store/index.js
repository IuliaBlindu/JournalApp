import Vuex from "vuex";

const store = new Vuex.Store({
  state: { userId: null, isNavOpen: false },
  getters: {
    getUser: state => {
      return state.userId;
    }
  },
  mutations: {
    toggleNav: state => {
      state.isNavOpen = !state.isNavOpen;
    },
    setUser: (state, id) => {
      console.log("Im here");
      state.userId = id;
    }
  }
});

export default store;
