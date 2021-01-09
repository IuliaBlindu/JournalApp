import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    userName: null,
    userId: null,
    isNavOpen: false,
    categoryAction: null,
    entryAction: "Add",
    entryToEdit: null,
    filter: "All"
  },

  mutations: {
    toggleNav: state => {
      state.isNavOpen = !state.isNavOpen;
    },
    setUserName: (state, name) => {
      state.userName = name;
    },
    setUserId: (state, id) => {
      state.userId = id;
    },
    setCategory: (state, name) => {
      state.categoryAction = name;
    },
    setEntry: (state, name) => {
      state.entryAction = name;
    },
    setEntryToEdit: (state, id) => {
      state.entryToEdit = id;
    },
    setFilter: (state, filter) => {
      state.filter = filter;
    },
  }
});

export default store;
