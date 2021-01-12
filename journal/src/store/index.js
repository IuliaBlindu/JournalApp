import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    isNavOpen: false,
    categoryAction: null,
    entryAction: null,
    filter: "all",
    feeling: null
  },

  mutations: {
    toggleNav: state => {
      state.isNavOpen = !state.isNavOpen;
    },
    setCategory: (state, name) => {
      state.categoryAction = name;
    },
    setEntry: (state, name) => {
      state.entryAction = name;
    },
    setFeeling: (state, feeling) => {
      state.feeling = feeling;
    },
    emptyStates: state => {
      state.isNavOpen = false;
      state.categoryAction = null;
      state.filter = "all";
      state.feelings = null;
    }
  }
});

export default store;
