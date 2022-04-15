<template>
  <div class="flex flex-col gap-y-8">
    <todo-form @taskCreated="addTask" />

    <div class="flex flex-col gap-y-4">
      <div
        class="p-2 rounded-lg odd:bg-pink-200 even:bg-violet-200"
        v-for="({ assignee, estimatedTime, id, isDone, title }, index) in arrayOfTask"
        :key="index">
        <todo
          :id="id"
          :title="title"
          :estimatedTime="estimatedTime"
          :isDone="isDone"
          :assignee="assignee"
          @deleteTask="removeTask"
          @toggleTaskStatus="toggleTaskStatus" />
      </div>
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
    addTask(newTask: Task): void {
      this.arrayOfTask.push(newTask);
    },
    getIndexOfTask(task: Task): number {
      const taskInArrayOfTask = this.arrayOfTask.find((todo) => todo.id === task.id);
      return this.arrayOfTask.indexOf(taskInArrayOfTask);
    },
    removeTask(task: Task): void {
      const index = this.getIndexOfTask(task);
      this.arrayOfTask.splice(index, 1);
    },
    toggleTaskStatus(task: Task): void {
      task.isDone = !task.isDone;

      const index = this.getIndexOfTask(task);
      this.arrayOfTask.splice(index, 1, task);
    },
  },
});
</script>
