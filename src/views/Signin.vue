<template>
  <div class="signInPage">
    <v-app-bar app color="#4F474E" dark prominent="true" mb5>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-layout row wrap align-center>
        <v-flex style="text-align:center">
          <v-form>
            <v-card class="container col-lg-1" max-width="50%" style="text-align:center">
              <v-btn class="ml-5 mr-5" to="/signinGoogle" width="70%">Sign in with Google</v-btn>
              <v-btn btn color="#FE5F5B" class="white--text" width="70%">
                <router-link to="/signinEmail">Sign in with Email</router-link>
              </v-btn>

              <v-btn to="/register" btn color="#4F474E" class="white--text" width="70%">Register</v-btn>

              <div>
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
  name: "Signin",

  data: () => ({
    title: "Open Doors English",
  }),
};
</script>

<style>
</style>