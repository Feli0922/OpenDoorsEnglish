<template>
  <v-card class="pa-5 mb-5 mx-auto" max-width="900">
    <v-card-text>
      <h2>{{post.user}}</h2>
      {{post.content}}
    </v-card-text>
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