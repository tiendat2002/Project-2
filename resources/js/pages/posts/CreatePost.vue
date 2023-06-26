<template>
  <main class="create-post">
    <div class="container">
      <h1>Create Posts!</h1>
      <!-- success message -->
      <div class="success-msg" v-if="success">
        <i class="fa fa-check"></i>
        Post created successfully
      </div>
      <!-- Contact Form -->
      <div class="contact-form">
        <form @submit.prevent="submit">
          <!-- Title -->
          <label for="title"><span>Title</span></label>
          <input type="text" id="title" v-model="fields.title" />
          <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>
          <br />

          <!-- Image -->
          <label for="image"><span>Image</span></label>
          <input type="file" id="image" @input="grabFile" />
          <span v-if="errors.file" class="error">{{ errors.file[0] }}</span>
          <div class="preview">
            <img :src="urlImage" alt="" />
          </div>
          <br />
          <!--Choose place in your blog -->

          <!-- Drop down -->
          <label for="categories"><span>Choose a category:</span></label>
          <select id="categories" v-model="fields.category_id">
            <option disabled value="" hidden>Select option</option>
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span v-if="errors.category_id" class="error">{{
            errors.category_id[0]
          }}</span>
          <br />

          <!-- Body-->
          <label for="body"><span>Body</span></label>
          <div id="app">
            <ckeditor
              style="
                 {
                  padding: 0 40px;
                }
              "
              :editor="editor"
              v-model="fields.body"
              @ready="onReady"
              @input="onChange"
            ></ckeditor>
          </div>
          <span v-if="errors.body" class="error">{{ errors.body[0] }}</span>

          <!-- Button -->
          <input class="add-post-btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

const ckeditor = CKEditor.component;

const editor = ref(ClassicEditor);

const onReady = (editor) => {
  console.log("CKEditor5 Vue Component is ready to use!", editor);
};

const onChange = (data) => {
  console.log(data);
};

const fields = ref({
  category_id: "",
  body: "",
});
const errors = ref({});
const success = ref(false);
const urlImage = ref(null);
const categories = ref(null);

const grabFile = (e) => {
  const file = e.target.files[0];
  fields.value.file = file;
  urlImage.value = URL.createObjectURL(file);
  URL.revokeObjectURL(file);
};

const submit = () => {
  console.log(fields.value);
  axios
    .post("/api/posts", fields.value, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      fields.value = {};
      errors.value = {};
      document.getElementById("image").value = null;
      fields.value.category_id = "";
      urlImage.value = null;
      success.value = true;
      setInterval(() => {
        success.value = false;
      }, 2500);
    })
    .catch((error) => {
      console.log(error);
      errors.value = error.response.data.errors;
      success.value = false;
    });
};

onMounted(() => {
  axios
    .get("/api/categories")
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>
.create-post {
  background-color: #fff;
  padding: 0 3vw;
}

.container input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 20px;
  font-size: 16px;
}

h1 {
  text-align: center;
  padding: 60px 0 50px 0;
}

.add-post-btn {
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.add-post-btn:hover {
  transform: translateY(-4px);
}

.preview img {
  max-width: 100%;
  max-height: 120px;
}
</style>
