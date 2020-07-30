<template>
  <div class="class">
    <v-app-bar color="#4F474E" dark prominent>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex text-center display-1">{{ getCurrentClass($route.params.id) }}</v-toolbar-title>

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
          <v-tab @click="currentTab = tabs[0]">{{ tabs[0] }}</v-tab>
          <v-tab @click="currentTab = tabs[1]">{{ tabs[1] }}</v-tab>
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
            <v-list-item-title v-if="currentUser">{{ currentUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>
              <router-link to="/profile">View Profile</router-link>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(c, i) in classes"
          :key="c.id"
          v-on:click="!c.edit ? goToClass(c.id) : ''"
        >
          <v-list-item-content>
            <v-text-field
              v-if="c.edit"
              v-model="c.name"
              @blur="
                c.edit = false;
                $emit('update');
              "
              @keyup.enter="
                c.edit = false;
                $emit('update');
              "
            />
            <div v-else>
              <v-list-item-title v-text="c.name"></v-list-item-title>
            </div>
          </v-list-item-content>

          <v-list-item-action v-if="currentUser && currentUser.role == 'teacher'">
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
                <v-list-item @click.stop="deleteClassDialog = true">
                  <v-list-item-title>Delete Class</v-list-item-title>
                  <v-dialog v-model="deleteClassDialog" max-width="400">
                    <v-card>
                      <v-card-title class="headline">Delete {{ c.name }}?</v-card-title>
                      <v-card-text>All of this class' material will be deleted.</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red"
                          text
                          @click="
                            deleteClass(i);
                            deleteClassDialog = false;
                          "
                        >Delete</v-btn>
                        <v-btn color="#4F474E" text @click="deleteClassDialog = false">Cancel</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="currentUser && currentUser.role == 'teacher'">
          <v-row justify="center">
            <v-dialog v-model="createClassDialog" max-width="600px">
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
                      v-on:click="
                        addClass();
                        createClassDialog = false;
                        newClass = '';
                      "
                    >Create</v-btn>
                    <v-btn
                      color="#4F474E"
                      text
                      v-on:click="
                        createClassDialog = false;
                        newClass = '';
                      "
                    >Cancel</v-btn>
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

    <v-container v-if="currentTab == tabs[0]">
      <NewPost></NewPost>
      <Post
        v-for="(post, i) in posts"
        :key="post.id"
        :post="post"
        :likes="likes"
        :user="currentUser"
        v-on:add-like="addPostLike(i)"
        v-on:remove-like="removePostLike(i)"
      ></Post>
    </v-container>
    <!-- <v-container v-else-if="currentTab == tabs[1]">
      <NewComposition></NewComposition>
      <Composition
        v-for="(comp, i) in compositions"
        :key="comp.id"
        :composition="comp"
        v-on:add-like="addCompositionLike(i)"
        v-on:remove-like="removeCompositionLike(i)"
      ></Composition>
    </v-container>-->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import db from "@/firestore.js";
import Post from "@/components/Post.vue";
import NewPost from "@/components/NewPost.vue";
// import Composition from "@/components/Composition.vue";
// import NewComposition from "@/components/NewComposition.vue";

export default {
  name: "Class",
  components: {
    Post,
    NewPost,
    // Composition,
    // NewComposition,
  },
  created() {
    this.$store.dispatch("bindClasses");
    this.$store.dispatch("bindPosts");
    this.$store.dispatch("bindUsers");
  },
  computed: { ...mapState(["classes", "posts", "users"]) },
  data: () => ({
    tabs: ["Discussion", "Compositions"],
    currentTab: "Discussion",
    drawer: false,
    createClassDialog: false,
    deleteClassDialog: false,
    newClass: "",
    userID: "cfRV4OwVPxycKwE5XiGq", // defaulted value
    currentUser: {},
    likes: [],
  }),
  methods: {
    goToClass(c) {
      this.$router.push("/class/" + c);
    },
    deleteClass(i) {
      this.classes.splice(i, 1);
    },
    addClass() {
      db.collection("classes")
        .add({ name: this.newClass })
        .then(() => {
          console.log("added to db");
        });
    },
    addPostLike(i) {
      this.posts[i].liked = true;
      this.posts[i].likes++;
    },
    removePostLike(i) {
      this.posts[i].liked = false;
      this.posts[i].likes--;
    },
    updateCurrentUser() {
      this.currentUser = this.users.find((user) => user.id == this.userID);
    },
    getCurrentClass(id) {
      return this.classes.find((c) => c.id == id)
        ? this.classes.find((c) => c.id == id).name
        : "404";
    },
    async updateLikes() {
      const events = await db.collection("posts");
      events.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.likes.push({ id: doc.id, likes: doc.data().likes });
        });
      });
    },
  },
  beforeMount() {
    this.updateLikes();
  },
  updated() {
    this.updateCurrentUser();
  },
};
</script>
