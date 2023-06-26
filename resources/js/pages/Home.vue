<template>
  <!-- header -->
  <header class="header">
    <div class="header-text">
      <h1>My Blog</h1>
      <h4>Travel Blog in VietNam...</h4>
    </div>
    <div class="overlay"></div>
  </header>
  <main class="container">
    <h2 class="header-title">Latest Blog Posts</h2>
    <section class="cards-blog latest-blog">
      <div class="card-blog-content" v-for="post in posts" :key="post.id">
        <div class="card-image">
          <img :src="post.imagePath" alt="" />
        </div>
        <p>
          {{ post.createdAt }}
          <span style="float: right">Written By {{ post.user }}</span>
        </p>
        <h4 style="font-weight: bolder">
          <router-link
            :to="{
              name: 'SingleBlog',
              params: {
                slug: post.slug,
                id: post.id,
              },
            }"
            >{{ post.title }}</router-link
          >
        </h4>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(["turnOffBlogMode"]);
emit("turnOffBlogMode");
const posts = ref([]);

onMounted(() => {
  axios
    .get("/api/home-posts")
    .then((response) => {
      posts.value = response.data.data;
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
