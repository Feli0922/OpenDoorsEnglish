<template>
  <div class="signInPage">
    <v-app-bar app color="#4F474E" dark prominent mb5>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-layout row wrap align-center>
        <v-flex style="text-align:center">
          <v-form>
            <!-- need to move card down -->
            <v-card class="container col-lg-1" max-width="50%" style="text-align:center">
              <v-btn
                class="mt-10 mb-6"
                style="font-size:18px"
                @click="signinGoogle"
                width="60%"
                height="60"
              >Sign in with Google</v-btn>
              <v-btn
                class="mb-6"
                style="font-size:18px"
                btn
                color="#FE5F5B"
                width="60%"
                height="60"
              >
                <router-link
                  class="white--text"
                  style="text-decoration:none"
                  to="/signinEmail"
                >Sign in with Email</router-link>
              </v-btn>

              <v-btn
                class="mb-10"
                style="font-size:18px"
                btn
                color="#4F474E"
                width="60%"
                height="60"
              >
                <router-link
                  class="white--text"
                  style="text-decoration:none"
                  to="/register"
                >Register</router-link>
              </v-btn>

              <div>
                <router-link to="/class/:id">click to go to class view</router-link>
                <p>
                  <a @click="signout">click to sign out</a>
                </p>
              </div>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: "Signin",

  data: () => ({
    title: "Open Doors English",
  }),
  methods: {
    signinGoogle: function () {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          // this.$router.push("/class/:id"); // there are a bunch of errors thrown when I go to the class page, idk what that's about
        });
    },
    signout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("You are now signed out");
        });
    },
  },
};
</script>

<style>
</style>