<template>
  <div class="listOfEntries">
    <h3 class="title" v-if="name !== null">
      {{ name }}
    </h3>
    <h3 class="title" v-if="name === null">All entries</h3>
    <div v-if="name !== null">
      <button
        class="btn btn-primary btn-sm mr-2 mb-2"
        v-on:click="editCategory()"
      >
        <Edit />
      </button>
      <button
        class="btn btn-secondary btn-sm mb-2"
        v-on:click="deleteCategory()"
      >
        <Delete /></button
      ><br />
      <span class="description"> {{ description }} </span><br />
      <span class="feeling"> {{ feeling }} </span><br /><br />
    </div>
    <Multiselect v-model="filter" :options="options" placeholder="Category" />
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
                class="btn btn-secondary"
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
import Multiselect from "@vueform/multiselect";

export default {
  name: "ListOfEntries",
  components: { Multiselect, Angry, Happy, Sad, Neutral, Edit, Delete },
  data() {
    return {
      value: null,
      filter: "null",
      description: "",
      name: "",
      feeling: "",
      categories: [{ name: null, id: null, feeling: null, description: null }],
      options: ["all"],
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
  computed: {
    cateogryId() {
      return localStorage.categoryId;
    },
    categoryName() {
      return localStorage.categoryName;
    },
  },
  watch: {
    filter(newValue) {
      //optional parameters
      localStorage.categoryId = this.categories[newValue].id;
      localStorage.categoryName = this.categories[newValue].name;
      this.name = this.categories[newValue].name;
      this.description = this.categories[newValue].description;
      this.feeling = this.categories[newValue].feeling;
      this.getEntries();
    },
  },
  methods: {
    getCategoryName(id) {
      this.categories.forEach(function (item) {
        if (item.id === id) {
          return item.name;
        }
      });
    },

    editEntry(id) {
      localStorage.entryToEdit = id;
      this.$store.commit("setEntry", "edit");
      this.$router.push("/edit-entry");
    },

    deleteEntry(id) {
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
            this.getEntries();
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
      let userId = localStorage.userId;
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            let data = res.data;
            data.forEach(function (item) {
              if (item.userId === userId) {
                self.categories.forEach(function (cat) {
                  if (cat.id === item.categoryId) {
                    item.categoryName = cat.name;
                  }
                });
                if (self.name === null) {
                  self.entries.push(item);
                } else {
                  if (item.categoryId === localStorage.categoryId) {
                    self.entries.push(item);
                  }
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

      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            let data = res.data;
            data.forEach(function (item) {
              if (item.userId === localStorage.userId) {
                console.log(item);
                self.categories.push({
                  name: item.name,
                  id: item.id,
                  feeling: item.feeling,
                  description: item.description,
                });
                self.options.push(item.name);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    editCategory() {
      this.$router.push("/edit-category");
    },

    deleteCategory() {
      let url = this.baseUrl + "/category";
      let self = this;
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "DELETE";
      callParameters.body = JSON.stringify({ id: localStorage.categoryId });

      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            self.entries.forEach(function (item) {
              let id = item.id;
              console.log(item.categoryId);
              console.log(localStorage.categoryId);
              if (item.categoryId === localStorage.categoryId) {
                self.deleteEntry(id);
              }
              self.$router.go();
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.name = null;
    this.getCategory();
    this.getEntries();
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
