<template>
  <div>
    <div class="card" id="categoryCard">
      <div class="card-body" id="categoryCardBody">
        <h4 class="title">
          <span v-if="this.$store.state.categoryAction === 'add'"> New </span>
          <span v-if="this.$store.state.categoryAction === 'edit'"> Edit </span>
          Category
        </h4>
        <form
          form
          @submit.prevent="
            this.$store.state.categoryAction === 'add' ? post() : put()
          "
        >
          <br />
          <div class="form-group">
            <label for="categoryName" class="labels">Name</label>
            <input
              id="categoryName"
              type="text"
              class="form-control"
              placeholder="Category Name"
              aria-describedby="basic-addon1"
              v-model="formData.name"
            />
          </div>

          <div class="form-group">
            <label for="categoryDescription" class="labels">Decription</label>
            <textarea
              class="form-control"
              id="categoryDescription"
              rows="3"
              placeholder="Say something about this category"
              v-model="formData.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="overallFeeling" class="labels">Overall Feeling</label>
            <input
              id="overallFeeling"
              type="text"
              class="form-control"
              placeholder="How do you feel about this category?"
              aria-describedby="basic-addon1"
              v-model="formData.feeling"
            />
          </div>
          <p class="error">{{ errors }}</p>
          <button type="submit" class="btn btn-primary">
            {{ this.$store.state.categoryAction }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryForm",
  data() {
    return {
      value: null,
      categories: [],
      formData: {
        id: "id",
        name: null,
        description: null,
        feeling: null,
        userId: null,
      },
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
    getCategory() {
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "GET";
      let url = this.baseUrl + "/categories";
      let self = this;

      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            self.errors = "Au aparut erori";
          } else {
            let data = res.data;
            data.forEach(function (item) {
              if (item.userId === localStorage.userId) {
                self.categories.push(item.name);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    },
    verifyDuplicity() {
      let self = this;
      let ok = 1;
      this.categories.forEach(function (category) {
        if (self.formData.name === category) {
          ok = 0;
        }
      });
      console.log(ok);
      return ok;
    },
    post() {
      let canPost = this.verifyDuplicity();
      if (canPost === 1) {
        let token = localStorage.getItem("token");
        if (token) {
          let callParameters = { ...this.apiCallParameters }; // shallow clone
          callParameters.method = "POST";
          let url = this.baseUrl + "/category";
          callParameters.headers.Authorization = "Bearer " + token;
          delete this.formData.id;
          this.formData.userId = localStorage.userId;
          callParameters.body = JSON.stringify(this.formData);
          fetch(url, callParameters)
            .then((res) => res.json())
            .then((res) => {
              if (!res.status === "success") {
                this.errors = "Errors occured during connection with database!";
              } else {
                this.formData.id = res.id;
                this.$router.push("/entry");
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.errors = "No access token";
        }
      } else {
        this.errors = "This category name already exists";
      }
    },
    put() {
      let canPost = this.verifyDuplicity();
      if (canPost === 1) {
        let token = localStorage.getItem("token");
        if (token) {
          let callParameters = { ...this.apiCallParameters }; // shallow clone
          callParameters.method = "PUT";
          let url = this.baseUrl + "/category";
          callParameters.headers.Authorization = "Bearer " + token;
          this.formData.userId = localStorage.userId;
          this.formData.id = localStorage.categoryId;
          callParameters.body = JSON.stringify(this.formData);
          fetch(url, callParameters)
            .then((res) => res.json())
            .then((res) => {
              if (!res.status === "success") {
                this.errors = "Errors occured during connection with database!";
              } else {
                localStorage.categoryId = null;
                localStorage.categoryName = null;
                this.$router.push("/home");
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.errors = "No access token";
        }
      } else {
        this.errors = "This category name already exists";
      }
    },
    fillForm() {
      let self = this;
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "GET";
      let url = this.baseUrl + "/category/" + localStorage.categoryId;
      fetch(url, callParameters)
        .then((res) => res.json())
        .then((res) => {
          if (!res.status === "success") {
            this.errors = "Errors occured during connection with database!";
          } else {
            self.formData.id = localStorage.id;
            self.formData.name = res.data.name;
            self.formData.description = res.data.description;
            self.formData.feeling = res.data.feeling;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.getCategory();
    if (this.$store.state.categoryAction === "edit") {
      this.fillForm();
    }
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
