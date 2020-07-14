<template>
  <v-card class="pa-5 mb-5 mx-auto" max-width="900">
    <v-card-title>
      {{post.user}}
      <v-spacer></v-spacer>
      <v-menu
        v-if="this.$parent.currentUser.isTeacher || post.user == this.$parent.currentUser.name"
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

    <v-card-text>{{post.content}}</v-card-text>
    <v-spacer></v-spacer>
    <v-btn v-if="!post.liked" v-on:click="$emit('add-like')" :ripple="false" icon class="mx-auto">
      <v-icon>mdi-thumb-up-outline</v-icon>
      {{ post.likes }}
    </v-btn>
    <v-btn v-else v-on:click="$emit('remove-like')" :ripple="false" icon class="mx-auto">
      <v-icon>mdi-thumb-up</v-icon>
      {{ post.likes }}
    </v-btn>

    <v-btn icon class="mx-auto">
      <v-icon>mdi-comment-text</v-icon>
      {{ post.comments.length }}
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
  data: () => ({}),
};
</script>

<style>
</style>