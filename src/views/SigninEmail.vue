<template>
  <div class="signinEmail">
    <v-app-bar app color="#4F474E" dark prominent="true" mb5>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-layout align-center justify-center>
        <v-flex>
          <v-form>
            <v-card class="studentReg" width="50%" justify-center>
              <div>
                <!-- <h1>sign in dialogue goes here</h1> -->
                <!-- <p>also include a button to register instead</p> -->

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
  name: "SigninEmail",

  data: () => ({
    title: "Open Doors English",
  }),
};
</script>

<style>
</style>