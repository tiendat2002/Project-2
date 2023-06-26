<template>
  <div id="create-categories">
    <div id="contact-us">
      <div class="create-categories">
        <router-link :to="{ name: 'CategoriesList' }"
          >Categories list <span>&#8594;</span></router-link
        >
      </div>
      <h1>Create New Category!</h1>
      <!-- success message -->
      <div class="success-msg" v-if="success">
        <i class="fa fa-check"></i>
        Category created successfully
      </div>
      <div class="contact-form">
        <form @submit.prevent="submit">
          <!-- name -->
          <label for="name"><span>Name</span></label>
          <input type="text" id="name" v-model="fields.name" />
          <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
          <!-- Image -->
          <label for="image"><span>Image</span></label>
          <input type="file" id="image" @input="grabFile" />
          <span v-if="errors.file" class="error">{{ errors.file[0] }}</span>
          <div class="preview">
            <img :src="urlImage" alt="" />
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const fields = ref({});
const errors = ref({});
const success = ref(false);
const urlImage = ref(null);

const grabFile = (e) => {
  const file = e.target.files[0];
  fields.value.file = file;
  urlImage.value = URL.createObjectURL(file);
  URL.revokeObjectURL(file);
};

function submit() {
  axios
    .post("/api/categories/create", fields.value, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      fields.value = {};
      errors.value = {};
      urlImage.value = null;
      success.value = true;
      const interval = setInterval(() => {
        success.value = false;
        clearInterval(interval);
      }, 2500);
    })
    .catch((error) => {
      errors.value = error.response.data.errors;
      console.log(error);
    });
}
</script>

<style scoped>
#create-categories {
  background-color: #f3f4f6;
  padding: 50px;
}
</style>
