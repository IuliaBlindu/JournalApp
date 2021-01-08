<template>
  <div class="row" id="authenticateContainer">
    <div class="col-sm-8" id="imageDiv"></div>
    <div class="col-sm-4" id="formDiv">
      <h1 class="title">Journal App</h1>
      <div class="card" id="authenticate" style="width: 18rem">
        <div class="card-body ">
          <form
            form
            @submit.prevent="formAction === 'Login' ? login() : register()"
          >
            <div class="input-group mb-3" v-if="formAction === 'Register'">
              <span class="input-group-text" id="basic-addon1">
                <Person />
              </span>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="name"
                aria-describedby="basic-addon1"
                v-model="formData.name"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <Email />
              </span>
              <input
                id="email"
                type="text"
                class="form-control"
                placeholder="email"
                aria-describedby="basic-addon1"
                v-model="formData.email"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                <Password />
              </span>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="password"
                aria-describedby="basic-addon1"
                v-model="formData.password"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ formAction }}
            </button>
          </form>
          <br />
          <a href="#" v-on:click="changeAction()">{{ switchText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Email from "../assets/icons/Email";
import Password from "../assets/icons/Password";
import Person from "../assets/icons/Person";

export default {
  name: "Login",
  components: {
    Email,
    Password,
    Person
  },
  data() {
    return {
      tasksArray: [],
      formData: {
        id: "id",
        name: null,
        email: null,
        password: null
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
          "Content-Type": "application/json"
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      },
      baseUrl: "http://localhost:3000/users",
      errors: ""
    };
  },
  methods: {
    changeAction() {
      console.log("Buna");
      if (this.formAction == this.loginTitle) {
        this.formAction = this.registerTitle;
        this.switchText = this.registerText;
      } else {
        this.formAction = this.loginTitle;
        this.switchText = this.loginText;
      }
    },
    login() {
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "POST";
      let url = this.baseUrl + "/login";
      delete this.formData.id;
      delete this.formData.name;
      callParameters.body = JSON.stringify(this.formData);
      fetch(url, callParameters)
        .then(res => res.json())
        .then(res => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            this.formData.id = res.id;
            delete this.formData.password;
            this.$router.push("/home");
          }
        })
        .catch(err => console.log(err));
    },
    register() {
      console.log(this.formData);
      let callParameters = { ...this.apiCallParameters }; // shallow clone
      callParameters.method = "POST";
      let url = this.baseUrl + "/register";
      delete this.formData.id;
      callParameters.body = JSON.stringify(this.formData);
      console.log(callParameters.body);
      fetch(url, callParameters)
        .then(res => res.json())
        .then(res => {
          if (!res.status === "success") {
            this.errors = "Au aparut erori";
          } else {
            this.formData.id = res.id;
            delete this.formData.password;
            this.formAction = this.loginTitle;
            this.switchText = this.loginText;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
