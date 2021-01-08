<template>
  <div class="authenticate-container">
    <h1>Journal App</h1>
    <div class="card align-middle" id="authenticate" style="width: 18rem">
      <div class="card-body">
        <h4>Register</h4>
        <form id="login" method="get" action="login.php">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <Person />
            </span>
            <input
              id="name"
              type="text"
              class="form-control"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <Email />
            </span>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
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
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>
        <router-link to="/">Already have an acoount? Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Person from "../assets/icons/Person";
import Email from "../assets/icons/Email";
import Password from "../assets/icons/Password";
export default {
  name: "Register",
  components: {
    Email,
    Password,
    Person
  }
};
</script>