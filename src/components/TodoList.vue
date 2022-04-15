<template>
  <div class="flex flex-col gap-y-8">
    <todo-form @taskCreated="addTask" />

    <div v-if="arrayOfTask.length > 0" class="flex gap-x-4 justify-center items-center">
      <button class="btn-gradient" @click="changeTaskVisibility('all')">
        Afficher toutes les tâches
      </button>
      <button class="btn-gradient" @click="changeTaskVisibility('undone')">
        Afficher les tâches à faire
      </button>
      <button class="btn-gradient" @click="changeTaskVisibility('done')">
        Afficher les tâches completées
      </button>
    </div>

    <div class="flex flex-col gap-y-4">
      <p v-if="arrayOfTask.length < 1" class="text-violet-500 font-semibold mx-auto text-2xl">
        (ﾉ◕ヮ◕)ﾉ*:･ﾟ Commencez par créer une tâche
      </p>
      <div
        class="p-2 rounded-lg odd:bg-pink-200 even:bg-violet-200"
        v-for="({ assignee, estimatedTime, id, isDone, title }, index) in getFilteredTask"
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

    <div v-if="arrayOfTask.length > 0" class="flex flex-col gap-y-2 btn-gradient">
      <p>{{ arrayOfTask.length }} tâche.s dont :</p>
      <p class="ml-8">{{ arrayOfTask.filter((task) => task.isDone).length }} tâche.s completée.s</p>
      <p class="ml-8">{{ arrayOfTask.filter((task) => !task.isDone).length }} tâche.s en cours</p>
    </div>
  </div>
</template>

<script lang="ts">
import type { Task, TaskVisibility } from '../models/task.model';
import { defineComponent } from 'vue';
import Todo from './Todo.vue';
import TodoForm from './TodoForm.vue';

const filters = {
  all: (todos: Task[]): Task[] => todos.filter((todo) => todo),
  done: (todos: Task[]): Task[] => todos.filter((todo) => todo.isDone),
  undone: (todos: Task[]): Task[] => todos.filter((todo) => !todo.isDone),
};

export default defineComponent({
  name: 'TodoList',
  components: { Todo, TodoForm },
  data() {
    return {
      arrayOfTask: [] as Task[],
      visibleTasks: 'all' as TaskVisibility,
    };
  },
  computed: {
    getFilteredTask(): Task[] {
      return filters[this.visibleTasks as TaskVisibility](this.arrayOfTask);
    },
  },
  methods: {
    addTask(newTask: Task): void {
      this.arrayOfTask.push(newTask);
    },
    changeTaskVisibility(newVisibility: TaskVisibility): void {
      this.visibleTasks = newVisibility as TaskVisibility;
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
