<template>
  <div class="class">
    <v-app-bar color="#4F474E" dark prominent>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex text-center display-1">Class ID: {{$route.params.id}}</v-toolbar-title>

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

        <v-list-item v-for="(c, i) in classes" :key="i" v-on:click="!c.edit ? goToClass(c.id) : ''">
          <v-list-item-content>
            <v-text-field
              v-if="c.edit"
              v-model="c.name"
              @blur="c.edit = false; $emit('update')"
              @keyup.enter="c.edit=false; $emit('update')"
            />
            <div v-else>
              <v-list-item-title v-text="c.name"></v-list-item-title>
            </div>
          </v-list-item-content>

          <v-list-item-action>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="c.edit = true">
                  <v-list-item-title>Edit Class Name</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteClass(i)">
                  <v-list-item-title>Delete Class</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#4F474E" dark v-bind="attrs" v-on="on">Create new class</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">New Class Name</span>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Class" v-model="newClass" @keydown.enter.native.prevent></v-text-field>
                    <v-btn
                      color="#4F474E"
                      text
                      v-on:click="submit(); dialog=false; newClass='';"
                    >Create</v-btn>
                    <v-btn color="#4F474E" text v-on:click="dialog=false; newClass='';">Cancel</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
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
    dialog: false,
    newClass: "",
    currentUser: "Martha Pollack",
    classes: [
      { name: "Class 1", id: "ABCD", edit: false },
      { name: "Class 2", id: "1234", edit: false },
      { name: "Class 3", id: "WXYZ", edit: false },
    ],
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
  methods: {
    goToClass(c) {
      this.$router.push("/class/" + c);
    },
    deleteClass(i) {
      this.classes.splice(i, 1);
    },
    submit() {
      this.classes.push({
        name: this.newClass,
        id: this.makeid(4),
        edit: false,
      });
    },
    makeid(length) {
      var result = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var cLength = chars.length;
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * cLength));
      }
      return result;
    },
  },
};
</script>
