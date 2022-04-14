<template>
  <div class="flex gap-x-2 justify-start items-center">
    <button class="group px-2 py-1 bg-slate-100 rounded-lg flex justify-center items-center">
      <span class="group-hover:animate-spin-fast" v-if="!isChecked">✔</span>
    </button>
    <p class="font-semibold text-violet-500">{{ title }}</p>
    <p class="text-slate-500">{{ estimatedTime }} heures</p>
    <p>{{ assignee }}</p>
    <button class="text-sm ml-auto px-4 hover:animate-spin-fast">✖</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoItem',
  props: {
    assignee: String,
    estimatedTime: Number,
    isChecked: Boolean,
    title: String,
  },
  data() {
    return {};
  },
});
</script>
