<template>
  <div class="flex flex-col gap-y-8">
    <todo-form @taskCreated="addTask" />

    <div v-if="arrayOfTask.length > 0" class="flex flex-col gap-y-8 justify-center items-start">
      <div class="flex gap-x-4 justify-center items-center">
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

      <div class="flex gap-x-4 justify-center items-center">
        <button
          class="btn-gradient disabled:cursor-not-allowed disabled:opacity-50"
          @click="removeSelectedTasks()"
          :disabled="selectedTasks.length < 1">
          🔥🔥🔥 Supprimer les tâches sélectionnées 🔥🔥🔥
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-y-4">
      <p v-if="arrayOfTask.length < 1" class="text-violet-500 font-semibold mx-auto text-2xl">
        (ﾉ◕ヮ◕)ﾉ*:･ﾟ Commencez par créer une tâche
      </p>
      <div
        class="p-2 rounded-lg odd:bg-pink-200 even:bg-violet-200 select-none"
        :class="{
          'border-4 border-pink-500': getIsSelected(id),
          'border-4 border-transparent': !getIsSelected(id),
        }"
        v-for="({ assignee, estimatedTime, id, isDone, title }, index) in getFilteredTask"
        :key="index">
        <todo
          :id="id"
          :title="title"
          :estimatedTime="estimatedTime"
          :isDone="isDone"
          :assignee="assignee"
          @selectTask="selectTask"
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
import { nanoid } from 'nanoid';
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
      arrayOfTask: [
        {
          assignee: 'Max',
          estimatedTime: '1',
          id: nanoid(),
          isDone: false,
          title: 'Faire le singe',
        },
        {
          assignee: 'Cindy',
          estimatedTime: '2',
          id: nanoid(),
          isDone: true,
          title: 'Allez à la salle',
        },
        {
          assignee: 'Quentin',
          estimatedTime: '3',
          id: nanoid(),
          isDone: false,
          title: 'Dire bonjour',
        },
        {
          assignee: 'Flavian',
          estimatedTime: '1',
          id: nanoid(),
          isDone: true,
          title: 'Arriver en retard',
        },
        {
          assignee: 'Priscillya',
          estimatedTime: '15',
          id: nanoid(),
          isDone: false,
          title: 'Caresser ses chats',
        },
      ] as Task[],
      selectedTasks: [] as Task[],
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
      this.selectedTasks = [];
      this.arrayOfTask.push(newTask);
    },
    changeTaskVisibility(newVisibility: TaskVisibility): void {
      this.selectedTasks = [];
      this.visibleTasks = newVisibility as TaskVisibility;
    },
    getIndexOfTask(task: Task): number {
      const taskInArrayOfTask = this.arrayOfTask.find((todo) => todo.id === task.id);
      return this.arrayOfTask.indexOf(taskInArrayOfTask);
    },
    getIsSelected(taskId: string): boolean {
      return this.selectedTasks.some((task: Task) => task.id == taskId);
    },
    removeSelectedTasks(): void {
      this.selectedTasks.forEach((task) => this.removeTask(task));
    },
    removeTask(task: Task): void {
      this.selectedTasks = [];
      const index = this.getIndexOfTask(task);
      this.arrayOfTask.splice(index, 1);
    },
    selectTask(taskId: string): void {
      const taskInArrayOfTask = this.arrayOfTask.find((task: Task) => task.id === taskId);
      const isAlreadySelected = this.selectedTasks.some((task: Task) => task.id === taskId);

      if (!isAlreadySelected) {
        this.selectedTasks.push(taskInArrayOfTask);
      } else {
        const taskInSelectedTasks = this.selectedTasks.find((todo: Task) => todo.id === taskId);
        const index = this.selectedTasks.indexOf(taskInSelectedTasks);

        this.selectedTasks.splice(index, 1);
      }
    },
    toggleTaskStatus(task: Task): void {
      this.selectedTasks = [];
      task.isDone = !task.isDone;

      const index = this.getIndexOfTask(task);
      this.arrayOfTask.splice(index, 1, task);
    },
  },
});
</script>
