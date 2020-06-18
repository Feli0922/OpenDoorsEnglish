<template>
  <div class="class">
    <v-app-bar app color="#4F474E" dark prominent="true">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex text-center display-1">{{title}}</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <!-- we might want to use nested routes for these tab views, 
      or we can just get rid of it and worry about it later 
      since we're not gonna get to compositions for a while-->
      <template v-slot:extension>
        <v-tabs centered>
          <v-tab>Discussion</v-tab>
          <v-tab>Compositions</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{currentUser}}</v-list-item-title>
            <v-list-item-subtitle>
              <router-link to="/profile">View Profile</router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group>
          <router-link to="/">
            <v-list-item>Log out</v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <NewPost></NewPost>
      <Post v-for="post in posts" :key="post.id" :post="post"></Post>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from "@/components/Post.vue";
import NewPost from "@/components/NewPost.vue";

export default {
  name: "Class",
  components: {
    Post,
    NewPost,
  },
  data: () => ({
    drawer: false,
    title: "Class Name",
    currentUser: "Martha Pollack",
    posts: [
      // this is dummy data, actual data structure will probably look different
      {
        id: 1,
        user: "Johann Smith",
        content: "Hi I'm Johann and I think cereal is a kind of soup",
        date: "today", // TODO: figure out how dates work in javascript
      },
      {
        id: 2,
        user: "Xiaoming Wang",
        content: "Hi I'm Xiaoming and I think dogs should be allowed to vote",
        date: "today",
      },
    ],
  }),
};
</script>
