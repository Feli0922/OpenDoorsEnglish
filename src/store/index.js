/**
 * Here's where I got the code for all the db stuff
 * https://vuefire.vuejs.org/vuexfire/binding-subscriptions.html
 *
 */

import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/firestore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classes: [],
    comments: [],
    posts: [],
    users: [],
  },
  getters: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindClasses: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("classes", db.collection("classes"));
    }),
    bindComments: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("comments", db.collection("comments"));
    }),
    bindPosts: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("posts", db.collection("posts"));
    }),
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("users", db.collection("users"));
    }),
  },
});
