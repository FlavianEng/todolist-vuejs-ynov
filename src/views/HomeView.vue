<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  components: { TodoList },
  data() {
    return {};
  },
});
</script>

<template>
  <div class="flex justify-center items-center">
    <todo-list />
  </div>
</template>
