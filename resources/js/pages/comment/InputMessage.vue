<template>
  <div class="mx-1 mb-4">
    <div class="d-flex pt-2 flex-row w-100 align-items-center">
      <div class="m-3">
        <img
          style="width: 50px"
          class="rounded-circle"
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt=""
        />
      </div>
      <div class="flex-grow-1">
        <div class="w-100 d-flex flex-col flex-wrap">
          <input
            type="text"
            v-model="message"
            @keyup.enter="sendMessage()"
            placeholder="Say something..."
            class="input-message flex-1 col-span-5 flex-grow-1 border border-top-0 border-start-0 border-end-0 border-slate-900 my-2 fs-5"
          />
        </div>
        <div class="w-100 px-3 d-flex flex-row justify-content-between">
          <div></div>
          <div>
            <button @click="cancelMessage()" class="rounded-pill p-1">
              Cancel
            </button>
            <button @click="sendMessage()" class="rounded-pill p-1 ms-2">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["commentPosts"]);
const message = ref("");
const emits = defineEmits(["messageSent"]);
const sendMessage = () => {
  if (!message.value.trim()) {
    return;
  }

  console.log(message.value);
};
</script>
