import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    userName: null,
    userId: null,
    isNavOpen: false,
    categoryAction: null,
    entryAction: "add",
    entryToEdit: null,
    filter: "all",
    filterId: null,
    description: null,
    feeling: null
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
    setFilterId: (state, id) => {
      state.filterId = id;
    },
    setDescription: (state, description) => {
      state.description = description;
    },
    setFeeling: (state, feeling) => {
      state.feeling = feeling;
    },
    emptyStates: state => {
      state.userName = null;
      state.userId = null;
      state.isNavOpen = false;
      state.categoryAction = null;
      state.entryToEdit = null;
      state.filter = "all";
      state.filterId = null;
      state.description = null;
      state.feelings = null;
    }
  }
});

export default store;
