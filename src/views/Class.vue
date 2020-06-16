<template>
  <div class="class">
    <Post></Post>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from "@/components/Post.vue";

export default {
  name: "Class",
  components: {
    Post,
  },
};
</script>
