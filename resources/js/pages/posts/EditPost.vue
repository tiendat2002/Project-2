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
                    <span v-if="errors.title" class="error">{{
                        errors.title[0]
                    }}</span>
                    <br />

                    <!-- Image -->
                    <label for="image"><span>Image</span></label>
                    <input type="file" id="image" @input="grabFile" />
                    <span v-if="errors.file" class="error">{{
                        errors.file[0]
                    }}</span>
                    <div class="preview">
                        <img :src="urlImage" alt="" />
                    </div>
                    <br />

                    <!-- Drop down -->
                    <label for="categories"
                        ><span>Choose a category:</span></label
                    >
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
                    <textarea id="body" v-model="fields.body"></textarea>
                    <span v-if="errors.body" class="error">{{
                        errors.body[0]
                    }}</span>

                    <!-- Button -->
                    <input class="add-post-btn" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["showEditSuccess"]);
const props = defineProps(["slug"]);

const fields = ref({
    category_id: "",
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
    const fd = new FormData();
    fd.append("title", fields.value.title);
    fd.append("category_id", fields.value.category_id);
    if (fields.value.file) {
        fd.append("file", fields.value.file);
        console.log(fields.value.file);
    }
    fd.append("body", fields.value.body);

    fd.append("_method", "PUT");
    axios
        .post("/api/posts/" + props.slug, fd, {
            headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
            emit("showEditSuccess");
            router.push({
                name: "DashboardPostsList",
            });
        })
        .catch((error) => {
            errors.value = error.response.data.errors;
            if (error.response.status === 403) {
                router.push({
                    name: "DashboardPostsList",
                });
            }
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
    axios
        .get("/api/posts/" + props.slug)
        .then((response) => {
            fields.value = response.data.data;
            urlImage.value = `/${response.data.data.imagePath}`;
        })
        .catch((error) => {
            if (error.response.status === 404) {
                router.push({
                    name: "DashboardPostsList",
                });
            }
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
