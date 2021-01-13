<template>
  <div>
    <div class="card" id="entryCard">
      <div class="card-body" id="entryCardBody">
        <h4 class="title">
          <span v-if="this.$store.state.entryAction === 'add'"> New </span>
          <span v-if="this.$store.state.entryAction === 'edit'"> Edit </span>
          Entry
        </h4>
        <br />
        <form
          form
          @submit.prevent="
            this.$store.state.entryAction === 'add' ? post() : put()
          "
        >
          <label for="drop" class="labels"
            >Category
            <button
              v-if="this.$store.state.entryAction === 'add'"
              class="btn btn-primary"
              v-on:click="addCategory()"
            >
              +
            </button></label
          >
          <div class="drop">
            <Multiselect
              v-model="formData.categoryId"
              :options="options"
              placeholder="Category"
            />
          </div>
          <br />
          <div class="form-group">
            <label for="entryTitle" class="labels">Title</label>
            <input
              id="entryTitle"
              type="text"
              class="form-control"
              placeholder="Title"
              aria-describedby="basic-addon1"
              v-model="formData.title"
            />
          </div>

          <div class="form-group">
            <label for="entryDate" class="labels">Date</label>
            <input
              id="entryDate"
              type="date"
              class="form-control"
              aria-describedby="basic-addon1"
              v-model="formData.date"
            />
          </div>

          <div class="form-group">
            <label for="description" class="labels">Description</label>
            <textarea
              class="form-control"
              id="description"
              rows="10"
              placeholder="Write you thoughts"
              v-model="formData.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="labels">Feeling</label>
            <div class="feeling">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="happy"
                  v-model="formData.feeling"
                />
                <label class="form-check-label" for="inlineRadio1"
                  ><Happy
                /></label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="neutral"
                  v-model="formData.feeling"
                />
                <label class="form-check-label" for="inlineRadio2"
                  ><Neutral
                /></label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="sad"
                  v-model="formData.feeling"
                />
                <label class="form-check-label" for="inlineRadio3"
                  ><Sad
                /></label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="angry"
                  v-model="formData.feeling"
                />
                <label class="form-check-label" for="inlineRadio4"
                  ><Angry
                /></label>
              </div>
            </div>
          </div>
          <p class="error">{{ errors }}</p>
          <button type="submit" class="btn btn-primary">
            {{ this.$store.state.entryAction }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

  <script>
import Multiselect from "@vueform/multiselect";
import Happy from "../assets/icons/Happy";
import Sad from "../assets/icons/Sad";
import Angry from "../assets/icons/Angry";
import Neutral from "../assets/icons/Neutral";
export default {
  name: "EntryForm",
  components: { Multiselect, Angry, Happy, Sad, Neutral },
  data() {
    return {
      options: [],
      categories: [],
      formData: {
        id: "id",
        userId: null,
        categoryId: null,
        title: null,
        date: null,
        description: null,
        feeling: null,
      },
      loginTitle: "Login",
      registerTitle: "Register",
      loginText: "Not an user? Sign up",
      registerText: "Already an user? Login",
      formAction: "Login",
      switchText: "Not an user? Sign up",
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
    addCategory() {
      this.$router.push("/category");
      this.$store.commit("setCategory", "add");
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
                self.categories.push({ name: item.name, id: item.id });
                self.options.push(item.name);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    post() {
      delete this.formData.id;
      this.formData.categoryId = this.categories[this.formData.categoryId].id;

      this.formData.userId = localStorage.userId;

      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "POST";
      let url = this.baseUrl + "/entry";

      callParameters.body = JSON.stringify(this.formData);
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Errors occured during connection with database!";
          } else {
            this.$router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    },
    put() {
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "PUT";
      let url = this.baseUrl + "/entry";

      callParameters.body = JSON.stringify(this.formData);
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Errors occured during connection with database!";
          } else {
            this.$router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    },
    fillForm() {
      let self = this;
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "GET";
      let url = this.baseUrl + "/entry/" + localStorage.entryToEdit;
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Errors occured during connection with database!";
          } else {
            self.formData.id = localStorage.entryToEdit;
            self.formData.userId = res.data.userId;
            self.formData.categoryId = res.data.categoryId;
            self.formData.title = res.data.title;
            self.formData.date = res.data.date;
            self.formData.description = res.data.description;
            self.formData.feeling = res.data.feeling;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.getCategory();
    if (this.$store.state.entryAction === "edit") {
      this.fillForm();
    }
  },
};
</script>
  <style src="@vueform/multiselect/themes/default.css"></style>
