<template>
  <div class="listOfEntries">
    <button
      type="button"
      class="btn btn-primary mr-2"
      v-for="(option, index) in options"
      :key="option"
      v-on:click="filterResults(index)"
    >
      {{ option }}
    </button>
    <br />
    <br />
    <h3 v-if="this.$store.state.filter !== 'All'">
      <button class="btn btn-primary" v-on:click="editEntry(element.id)">
        <Edit />
      </button>
      {{ this.$store.state.filter }}
      <button
        class="btn btn-primary"
        style="
          background-color: rgb(166, 143, 130) !important;
          border-color: rgb(166, 143, 130) !important;
        "
        v-on:click="deleteEntry(element.id)"
      >
        <Delete />
      </button>
    </h3>

    <br />
    <br />
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="element in entries" :key="element.id">
        <div class="card mb-3">
          <div class="card-header title">{{ element.categoryName }}</div>
          <div class="card-body">
            <Happy v-if="element.feeling === 'happy'" />
            <Neutral v-if="element.feeling === 'neutral'" />
            <Sad v-if="element.feeling === 'sad'" />
            <Angry v-if="element.feeling === 'angry'" />
            <br />
            <h5 class="card-title title">
              {{ element.title }}
            </h5>
            {{ element.category }}
            <h6 class="card-subtitle mb-2 text-muted">{{ element.date }}</h6>

            <p class="card-text">
              {{ element.description }}
            </p>
          </div>
          <div class="card-footer">
            <a href="#" class="card-link">
              <button
                class="btn btn-primary"
                v-on:click="editEntry(element.id)"
              >
                Edit
              </button></a
            >
            <a href="#" class="card-link">
              <button
                class="btn btn-primary"
                style="
                  background-color: rgb(166, 143, 130) !important;
                  border-color: rgb(166, 143, 130) !important;
                "
                v-on:click="deleteEntry(element.id)"
              >
                Delete
              </button></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Edit from "../assets/icons/Edit";
import Delete from "../assets/icons/Delete";
import Happy from "../assets/icons/Happy";
import Sad from "../assets/icons/Sad";
import Angry from "../assets/icons/Angry";
import Neutral from "../assets/icons/Neutral";

export default {
  name: "ListOfEntries",
  components: { Angry, Happy, Sad, Neutral, Edit, Delete },
  data() {
    return {
      value: null,
      categories: [{ name: "All", id: "null" }],
      options: ["All"],
      entries: [],
      apiCallParameters: {
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      },
      baseUrl: "http://localhost:3000/users",
      errors: "",
    };
  },

  methods: {
    filterResults(filter) {
      this.$store.commit("setFilter", this.categories[filter].name);
      this.$store.commit("setFilterId", this.categories[filter].id);
      this.getEntries();
    },
    getCategoryName(id) {
      this.categories.forEach(function (item) {
        if (item.id === id) {
          return item.name;
        }
      });
    },

    editEntry(id) {
      console.log(id);
      this.$store.commit("setEntryToEdit", id);
      this.$store.commit("setEntry", "edit");
      this.$router.push("/entry");
    },

    deleteEntry(id) {
      let self = this;
      let url = this.baseUrl + "/entry";
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "DELETE";
      callParameters.body = JSON.stringify({ id: id });

      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            this.getEntries(self.$store.state.filter);
          }
        })
        .catch((err) => console.log(err));
    },

    getEntries() {
      this.entries = [];
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "GET";
      let url = this.baseUrl + "/entries";
      let self = this;
      let userId = this.$store.state.userId;
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            let data = res.data;
            data.forEach(function (item) {
              if (item.userId === userId)
                if (self.$store.state.filter === "All") {
                  self.entries.push(item);
                } else {
                  if (item.categoryName === self.$store.state.filter) {
                    self.entries.push(item);
                  }
                }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    getCategory() {
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "GET";
      let url = this.baseUrl + "/categories";
      let self = this;
      let userId = this.$store.state.userId;
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            let data = res.data;
            data.forEach(function (item) {
              if (item.userId === userId) {
                self.categories.push({ name: item.name, id: item.id });
                self.options.push(item.name);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.getCategory();
    this.getEntries("All");
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
