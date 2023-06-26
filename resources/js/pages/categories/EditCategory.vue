<template>
  <div id="create-categories">
    <div id="contact-us">
      <div class="create-categories">
        <router-link :to="{ name: 'CategoriesList' }"
          >Categories list <span>&#8594;</span></router-link
        >
      </div>
      <h1>Edit Category!</h1>
      <!-- success message -->
      <div class="success-msg" v-if="success">
        <i class="fa fa-check"></i>
        Update successfully
      </div>
      <div class="contact-form">
        <form @submit.prevent="submit">
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
          <input type="submit" value="Update Change" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";

const fields = ref({});
const errors = ref({});
const success = ref(false);
const props = defineProps(["id"]);
const urlImage = ref(null);

const grabFile = (e) => {
  const file = e.target.files[0];
  fields.value.file = file;
  urlImage.value = URL.createObjectURL(file);
  URL.revokeObjectURL(file);
};

const submit = () => {
  const fd = new FormData();
  fd.append("name", fields.value.name);
  if (fields.value.file) {
    fd.append("file", fields.value.file);
  }
  fd.append("_method", "PUT");
  axios
    .post("/api/categories/" + props.id, fd, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      fields.value = {};
      errors.value = {};
      success.value = true;
      const interval = setInterval(() => {
        success.value = false;
        clearInterval(interval);
      }, 2500);
    })
    .catch((error) => {
      errors.value = error.response.data.errors;
    });
};

onMounted(() => {
  axios
    .get("/api/categories/" + props.id)
    .then((response) => {
      fields.value = response.data;
      console.log(response.data);
      urlImage.value = `/${response.data.imagePath}`;
    })
    .catch((error) => {
      errors.value = error.response.data.errors;
    });
});
</script>

<style scoped>
#create-categories {
  background-color: #f3f4f6;
  padding: 50px;
}
</style>
