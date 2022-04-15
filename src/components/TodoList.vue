<template>
  <edit-form :isEditing="isEditing" @cancelEdit="cancelEdit" :task="editedTask" />
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
          @editTask="editTask"
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
import EditForm from './EditForm.vue';
import store from '@/store';
import Todo from './Todo.vue';
import TodoForm from './TodoForm.vue';

const filters = {
  all: (todos: Task[]): Task[] => todos.filter((todo) => todo),
  done: (todos: Task[]): Task[] => todos.filter((todo) => todo.isDone),
  undone: (todos: Task[]): Task[] => todos.filter((todo) => !todo.isDone),
};

export default defineComponent({
  name: 'TodoList',
  components: { EditForm, Todo, TodoForm },
  data() {
    return {
      arrayOfTask: store.getters['todoStore/todos'] as Task[],
      editedTask: {} as Task,
      isEditing: false,
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
      store.commit('todoStore/addTodo', newTask);
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedTask = {};
    },
    changeTaskVisibility(newVisibility: TaskVisibility): void {
      this.selectedTasks = [];
      this.visibleTasks = newVisibility as TaskVisibility;
    },
    editTask(taskId: string): void {
      this.selectedTasks = [];
      this.isEditing = true;

      const taskToEdit = this.arrayOfTask.find((task: Task) => task.id === taskId);

      if (!taskToEdit) return;

      this.editedTask = taskToEdit;
    },
    getIsSelected(taskId: string): boolean {
      return this.selectedTasks.some((task: Task) => task.id == taskId);
    },
    removeSelectedTasks(): void {
      this.selectedTasks.forEach((task: Task) => this.removeTask(task));
    },
    removeTask(task: Task): void {
      this.selectedTasks = [];
      store.commit('todoStore/removeTodo', task);
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
      store.commit('todoStore/updateTodo', task);
    },
  },
});
</script>
