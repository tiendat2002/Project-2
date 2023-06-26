<template>
  <main class="container">
    <div class="searchbar">
      <form action="">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          v-model="title"
        />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
    <div class="categories">
      <ul>
        <li v-for="category in categories" :key="category.id" class="">
          <a href="#" @click="filterByCategory(category.name)">{{
            category.name
          }}</a>
        </li>
      </ul>
    </div>
    <section class="cards-blog latest-blog">
      <!-- blog -->
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
    <!-- pagination -->
    <h3 class="notFoundText" v-if="!posts.length">
      Sorry, no match was found!
    </h3>
    <div class="pagination" id="pagination">
      <a
        href="#"
        v-for="(link, index) in links"
        :key="index"
        v-html="link.label"
        :class="{ active: link.active, disable: !link.url }"
        @click="changeLink(link)"
      ></a>
    </div>
  </main>
</template>

<script setup>
import { ref, defineEmits, onMounted, watch } from "vue";

const emit = defineEmits(["turnOffBlogMode"]);
const posts = ref([]);
emit("turnOffBlogMode");
const title = ref("");
const links = ref([]);

watch(title, (newValue, oldValue) => {
  axios
    .get("/api/posts", {
      params: {
        search: title.value,
      },
    })
    .then((response) => {
      posts.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

const categories = ref([]);

const filterByCategory = (name) => {
  axios
    .get("/api/posts", {
      params: {
        category: name,
      },
    })
    .then((response) => {
      posts.value = response.data.data;
      links.value = response.data.meta.links;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeLink = (link) => {
  axios
    .get(link.url)
    .then((response) => {
      posts.value = response.data.data;
      links.value = response.data.meta.links;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  axios
    .get("api/categories")
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get("/api/posts")
    .then((response) => {
      posts.value = response.data.data;
      console.log(response.data);
      links.value = response.data.meta.links;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
<style scope>
.notFoundText {
  font-size: 2rem;
  text-align: center;
  margin: 50px 0;
  color: #fff;
}

.disable {
  pointer-events: none;
}
</style>
