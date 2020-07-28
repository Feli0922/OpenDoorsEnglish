<template>
  <v-card class="pa-5 mb-5 mx-auto" max-width="900">
    <v-card-title>
      {{post.author.name}}
      <v-spacer></v-spacer>
      <v-menu
        v-if="this.$parent.currentUser && (this.$parent.role == 'teacher' || post.author.user_id == this.$parent.currentUser.id)"
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-card-title>

    <v-card-text>{{post.body}}</v-card-text>
    <v-spacer></v-spacer>
    <v-btn v-if="lkd" v-on:click="$emit('remove-like')" :ripple="false" icon class="mx-auto">
      <v-icon>mdi-thumb-up</v-icon>
      {{ lks.length }}
    </v-btn>
    <v-btn v-else v-on:click="$emit('add-like')" :ripple="false" icon class="mx-auto">
      <v-icon>mdi-thumb-up-outline</v-icon>
      {{ lks.length }}
    </v-btn>

    <v-btn icon class="mx-auto">
      <v-icon>mdi-comment-text</v-icon>
      {{ comm }}
    </v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firestore.js";
export default {
  name: "Post",
  props: ["post", "likes", "user"],
  created() {
    this.$store.dispatch("bindComments");
  },
  computed: { ...mapState(["comments"]) },
  data: () => ({
    comm: 0,
    lks: [],
    lkd: false,
  }),
  methods: {
    numComments() {
      db.collection("comments")
        .get()
        .then((snap) => {
          this.comm = snap.size; // will return the collection size
        });
    },
    getLikes() {
      this.lks = this.likes.find((post) => post.id == this.post.id).likes;
    },
    liked() {
      this.lkd = !!this.lks.find((id) => this.user.id == id);
    },
  },
  beforeMount() {
    this.numComments();
  },
  updated() {
    this.getLikes();
    this.liked();
  },
};
</script>

<style>
</style>