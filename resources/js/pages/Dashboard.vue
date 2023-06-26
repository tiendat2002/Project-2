<template>
  <div id="backend-view">
    <div class="logout"><a href="#" @click="logOut">Log out</a></div>
    <h1 class="heading">Dashboard</h1>
    <span>Hi {{ user.name }}?</span>
    <div class="links">
      <ul>
        <li>
          <router-link :to="{ name: 'CreatePost' }">Create Post</router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'DashboardPostsList',
            }"
            >Posts List</router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'CreateCategory' }">
            <a href="">Create Category</a></router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'CategoriesList' }"
            >Categories List</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, defineEmits } from "vue";
const user = ref({});
const router = useRouter();
const emit = defineEmits(["updateSidebar", "turnOffBlogMode"]);
emit("turnOffBlogMode");

onMounted(() => {
  axios
    .get("api/user")
    .then((response) => {
      user.value = response.data;
    })
    .catch((error) => {
      if (error.response.status == 401) {
        emit("updateSidebar");
        localStorage.removeItem("authentication");
        router.push({ name: "Login" });
      }
      console.log(error);
    });
});

const logOut = () => {
  axios
    .post("api/logout")
    .then((response) => {
      router.push({ name: "Home" });
      localStorage.removeItem("authentication");
      emit("updateSidebar");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
/* Dashboard */
#backend-view {
  text-align: center;
  background-color: #f3f4f6;
  height: 100vh;
  padding-top: 15vh;
}

.logout {
  position: absolute;
  top: 30px;
  right: 40px;
}
.heading {
  margin-bottom: 5px;
}
.links {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  max-width: 500px;
  padding: 15px;
  border-radius: 15px;
}
.links ul {
  list-style: none;
}
.links a {
  all: revert;
  font-size: 26px;
  display: inline-block;
  margin: 10px 0;
}
</style>
