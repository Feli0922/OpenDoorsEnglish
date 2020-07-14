<template>
  <div class="signinEmail">
    <v-app-bar app color="#4F474E" dark prominent="true" mb5>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-layout row wrap align-center>
        <v-flex style="text-align:center">
          <v-form>
            <v-card class="container col-lg-1" max-width="50%" style="text-align:center">
              <div>
                <v-card-title style="text-align:justify-center">Register</v-card-title>
                <router-link to="/">click to go back to signin page</router-link>
                <div class="input field">
                  <label for="yourname">Your Name:</label>
                  <input type="text" id="yourname" placeholder="Name" />
                </div>
                <div class="input field">
                  <label for="email">Your Email:</label>
                  <input type="text" id="email" placeholder="Email" />
                </div>
                <div class="input field">
                  <label for="password">Create Password:</label>
                  <input type="text" id="password" placeholder="Password" />
                </div>
                <div>
                  <v-btn btn color="grey" class="white--text">Register</v-btn>
                </div>

                <router-link to="/class/:id">click to go to class view</router-link>
              </div>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Register",

  data: () => ({
    title: "Open Doors English",
  }),
  function() {
    return {};
  },
};
</script>

<style>
</style>