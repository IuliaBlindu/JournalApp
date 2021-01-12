import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    isNavOpen: false,
    categoryAction: null,
    entryAction: "add",
    filter: "all",
    description: null,
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
    setFilter: (state, filter) => {
      state.filter = filter;
    },
    setDescription: (state, description) => {
      state.description = description;
    },
    setFeeling: (state, feeling) => {
      state.feeling = feeling;
    },
    emptyStates: state => {
      state.isNavOpen = false;
      state.categoryAction = null;
      state.filter = "all";
      state.description = null;
      state.feelings = null;
    }
  }
});

export default store;
