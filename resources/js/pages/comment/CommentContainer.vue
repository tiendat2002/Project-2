<template>
  <div class="bg-white border-2 border border-secondary-subtle w-100">
    <InputMessage :postId="props.postId"></InputMessage>
    <div
      v-for="(comment, index) in props.comment"
      :key="index"
      class="d-flex flex-row align-items-start w-100"
    >
      <div class="mx-3" style="width: 70px">
        <img
          class="rounded-circle"
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt=""
        />
      </div>
      <div class="flex-grow-1 px-2">
        <h3 class="fs-6 fw-normal mb-1" style="color: rgb(108, 106, 106)">
          {{ comment.visitor_name }}
        </h3>
        <spa
          class="fw-normal"
          style="font-size: 0.75rem; color: rgb(108, 106, 106)"
          >{{ comment.created_at }}</spa
        >
        <p class="fs-6">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputMessage from "./InputMessage.vue";
import { ref, defineProps, onMounted } from "vue";
const commentPosts = ref({});
const messages = ref([]);
const props = defineProps(["postId", "comment"]);
console.log(props.postId);
console.log(props.comment);

onMounted(async () => {
  await getComment();
});
</script>
