<template>
  <v-app>
    <v-app-bar app color="#4F474E" dark prominent="true">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs centered>
          <v-tab>Discussion</v-tab>
          <v-tab>Compositions</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{currentUser}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
      <Signin></Signin>/* TODO: don't do this */
      <Class></Class>
    </v-content>
  </v-app>
</template>

<script>
import Signin from "./views/Signin";
import Class from "./views/Class";

export default {
  name: "App",

  components: {
    Signin,
    Class,
  },

  data: () => ({
    drawer: false,
    title: "Class Name",
    currentUser: "Martha Pollack",
  }),
};
</script>

<style>
#app {
  background-color: #f1e9e9;
}
</style>