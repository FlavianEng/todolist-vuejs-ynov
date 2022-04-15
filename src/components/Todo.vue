<template>
  <div
    class="flex gap-x-4 justify-start items-center cursor-pointer"
    @click="this.$emit('selectTask', id)">
    <button
      type="button"
      class="group px-2 py-1 bg-slate-100 rounded-lg flex justify-center items-center"
      @click.stop="this.$emit('toggleTaskStatus', { assignee, estimatedTime, id, isDone, title })">
      <span class="group-hover:animate-spin-fast" v-if="!isDone">✔</span>
      <span class="group-hover:animate-spin-fast" v-if="isDone">❌</span>
    </button>
    <p class="font-semibold text-violet-500">🧾 Tâche : {{ title }}</p>
    <span>|</span>
    <p>⏲ {{ estimatedTime }} heure.s</p>
    <span>|</span>
    <p>🙍‍♂️ Assigné à : {{ assignee }}</p>
    <div class="ml-auto">
      <button
        type="button"
        class="text-sm ml-auto px-4 hover:animate-spin-fast"
        @click.stop="this.$emit('editTask', id)">
        ✏
      </button>
      <button
        type="button"
        class="text-sm ml-auto px-4 hover:animate-spin-fast"
        @click.stop="this.$emit('deleteTask', { assignee, estimatedTime, id, isDone, title })">
        ✖
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoItem',
  props: {
    assignee: String,
    estimatedTime: String,
    id: String,
    isDone: Boolean,
    title: String,
  },
  data() {
    return {};
  },
  emits: ['deleteTask', 'toggleTaskStatus', 'selectTask', 'editTask'],
});
</script>
