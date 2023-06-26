<template>
  <main class="container">
    <section class="single-blog-post">
      <h1>{{ post.title }}</h1>

      <div class="time-and-author">
        <div>
          <i
            v-for="index in getRange(post.level)"
            :key="index"
            class="fa-solid fa-star"
            style="color: rgb(0, 38, 255)"
          ></i>
          <i
            v-for="index in getRange(5 - post.level)"
            :key="5 - index"
            class="fa-regular fa-star"
          ></i>
        </div>
        <span>{{ post.createdAt }} - Written By {{ post.user }}</span>
      </div>

      <div class="single-blog-post-ContentImage" data-aos="fade-left">
        <img :src="`/${post.imagePath}`" alt="" />
      </div>

      <div class="about-text" v-html="post.body"></div>
    </section>
    <section class="recommended">
      <p>Related</p>
      <div class="recommended-cards">
        <div
          class="recommended-card"
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
        >
          <router-link
            :to="{
              name: 'SingleBlog',
              params: {
                slug: relatedPost.slug,
              },
            }"
            @click="getAllData"
          >
            <div class="card-image">
              <img :src="`/${relatedPost.imagePath}`" alt="" loading="lazy" />
            </div>
            <h4>{{ relatedPost.title }}</h4>
          </router-link>
        </div>
      </div>
    </section>
    <section class="comment-area">
      <CommentContainer
        v-for="(comment, index) in post.comments"
        :key="index"
        :postId="props.id"
        :comment="comment"
      />
    </section>
  </main>
</template>

<script setup>
import CommentContainer from "./comment/CommentContainer.vue";
import { ref, defineProps, onMounted, defineEmits } from "vue";

const post = ref({});
const relatedPosts = ref({});
const props = defineProps(["slug", "id"]);
const emit = defineEmits(["turnOnBlogMode"]);

emit("turnOnBlogMode");

const getAllData = () => {
  axios
    .get("/api/posts/" + props.slug)
    .then((response) => {
      post.value = response.data.data;
      console.log(post.value);
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get("/api/related-posts/" + props.slug)
    .then((response) => {
      relatedPosts.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRange = (number) => {
  return Array.from({ length: number }, (_, index) => index + 1);
};

onMounted(() => {
  getAllData();
});
</script>
