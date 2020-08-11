<template>
  <div>
    <div class="profile">
      <v-app-bar color="#4F474E" dark prominent height="160">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title
          class="flex text-center display-1 mb-10"
        >{{ currentUser.name + currentUser.profile_end }}</v-toolbar-title>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
      </v-app-bar>
      <router-link to="/class/:id">click to go to class view</router-link>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex style="text-align:center">
            <v-card class="container col-lg-1 mt-6" max-width="80%" height="400">
              <div>
                <v-row class="mt-10">
                  <v-col class="container col-lg-3">
                    <v-icon size="100">mdi-account-circle</v-icon>
                    <v-card-title class="mt-3 justify-center">{{ currentUser.name }}</v-card-title>
                    <div>
                      <v-btn color="#FE5F5B" btn class="white--text mb-6">Logout</v-btn>
                    </div>
                    <div>
                      <router-link to="/change_pass" style="text-decoration:none">Change Password</router-link>
                    </div>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col style="text-align:left">
                        <h3>Past Posts</h3>
                      </v-col>
                      <!-- </v-row>
                      <v-row>-->
                      <v-col>
                        <form>
                          <input
                            style="text-align:right"
                            type="text"
                            name="search"
                            placeholder="Search in items"
                          />
                        </form>
                      </v-col>
                    </v-row>
                    <v-row>
                      <p>insert past posts here</p>
                      <v-container>
                        <Post v-for="(post) in posts" :key="post.id" :post="post"></Post>
                      </v-container>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser.name }}</v-list-item-title>
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

          <v-list-item-action v-if="currentUser.isTeacher">
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

        <v-list-item v-if="currentUser.isTeacher">
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
                        submit();
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
  </div>
</template>

<script>
export default {
  name: "Profile",

  data: () => ({
    tabs: ["Discussion", "Compositions"],
    currentTab: "Discussion",
    drawer: false,
    createClassDialog: false,
    deleteClassDialog: false,
    newClass: "",
    currentUser: {
      name: "Johann Smith",
      isTeacher: false,
      profile_end: "'s Profile",
    },
    posts: [
      // this is dummy data, actual data structure will probably look different
      {
        id: 1,
        user: "Johann Smith",
        content: "Hi I'm Johann and I think cereal is a kind of soup",
        likes: 0,
        liked: false,
        comments: [{ user: "Random Armadillo", comment: "lol" }],
        date: "today",
      },
    ],
  }),
};
</script>

<style></style>
