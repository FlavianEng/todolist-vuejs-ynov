<template>
  <div class="flex flex-col gap-y-8">
    <todo-form @taskCreated="addTask" />

    <div class="flex flex-col gap-y-4">
      <todo
        class="p-2 rounded-lg odd:bg-pink-200 even:bg-violet-200"
        v-for="({ assignee, estimatedTime, isChecked, title }, index) in arrayOfTask"
        :key="index"
        :title="title"
        :estimatedTime="estimatedTime"
        :isChecked="isChecked"
        :assignee="assignee" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '../models/task.model';
import Todo from './Todo.vue';
import TodoForm from './TodoForm.vue';

export default defineComponent({
  name: 'TodoList',
  components: { Todo, TodoForm },
  data() {
    return {
      arrayOfTask: [] as Task[],
    };
  },
  methods: {
    addTask(newTask: Task) {
      this.arrayOfTask.push(newTask);
    },
  },
});
</script>
