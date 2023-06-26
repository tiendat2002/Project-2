<template>
  <div id="wrapper" :class="{ blogModeContent: isBlogModeTain }">
    <!-- sidebar -->
    <div class="show-sidebar"></div>
    <div
      class="sidebar"
      :class="{
        showOverlay: overlayVisibility,
      }"
    >
      <span class="closeButton" @click="hideOverlay">&times;</span>
      <p class="brand-title"><a href="">Travel Blog</a></p>

      <div class="side-links">
        <ul class="links-list">
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'Blog' }"
              >Blog</router-link
            >
          </li>
          <li v-if="isLogin">
            <router-link @click="hideOverlay" :to="{ name: 'Dashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'About' }"
              >About</router-link
            >
          </li>
          <!-- <li>
            <router-link @click="hideOverlay" :to="{ name: 'Contact' }"
              >Contact</router-link
            >
          </li> -->
          <li v-if="!isLogin">
            <router-link @click="hideOverlay" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <li v-if="!isLogin">
            <router-link @click="hideOverlay" :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li>
        </ul>
      </div>

      <!-- sidebar footer -->
      <footer class="sidebar-footer">
        <div>
          <a href=""><i class="fab fa-facebook-f"></i></a>
          <a href=""><i class="fab fa-instagram"></i></a>
          <a href=""><i class="fab fa-twitter"></i></a>
        </div>
      </footer>
    </div>
    <!-- Menu Button -->
    <div class="menuButton" @click="showOverlay">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <!-- render components depending on the page visited -->
    <router-view
      @show-edit-success="showEditSuccess"
      @update-sidebar="updateSidebar"
      :editSuccess="editSuccess"
      :key="route.fullPath"
    ></router-view>

    <!-- Main footer -->
    <footer class="main-footer">
      <div>
        <a href=""><i class="fab fa-facebook-f"></i></a>
        <a href=""><i class="fab fa-instagram"></i></a>
        <a href=""><i class="fab fa-twitter"></i></a>
      </div>
    </footer>
  </div>
  <div class="modal">
    <form @submit.prevent="submit">
      <h3>Login Here</h3>
      <label for="email">Email</label>
      <input type="text" id="email" v-model="fields.email" />
      <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>

      <label for="password">Password</label>
      <input type="password" id="password" v-model="fields.password" />
      <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
      <button type="submit">Log In</button>
      <span
        >Don't have an account?
        <router-link :to="{ name: 'Register' }">Sign up</router-link></span
      >
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const overlayVisibility = ref(false);
const isLogin = ref(false);
const editSuccess = ref(false);
const isBlogMode = ref(false);
const isBlogModeTain = ref(false);
const fields = reactive({});
const errors = ref({});

const submit = () => {
  axios
    .post("api/login", fields)
    .then(() => {
      localStorage.setItem("authentication", "true");
    })
    .catch((error) => {
      errors.value = error.response.data.errors;
    });
};

const showOverlay = () => {
  overlayVisibility.value = true;
};

const hideOverlay = () => {
  overlayVisibility.value = false;
};

const updateSidebar = () => {
  isLogin.value = !isLogin.value;
};

const showEditSuccess = () => {
  editSuccess.value = true;

  setInterval(() => {
    editSuccess.value = false;
  }, 2500);
};

onMounted(() => {
  console.log(localStorage.getItem("authentication"));
  if (localStorage.getItem("authentication")) {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
</script>

<style scope>
.showOverlay {
  z-index: 5;
  height: 100% !important;
}

.showOverlay .closeButton {
  opacity: 1;
}
</style>
