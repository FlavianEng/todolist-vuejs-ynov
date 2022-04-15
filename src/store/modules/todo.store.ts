import { nanoid } from 'nanoid';
import type { Task } from '@/models/task.model';

interface todoState {
  todos: Task[];
}

export default {
  getters: {
    todos(state: todoState): Task[] {
      return state.todos;
    },
  },
  mutations: {
    addTodo(state: todoState, todo: Task): void {
      state.todos.push(todo);
    },
    editTodo(state: todoState, task: Task): void {
      const index = state.todos.findIndex((todo) => todo.id === task.id);
      state.todos.splice(index, 1, task);
    },
    removeTodo(state: todoState, task: Task): void {
      const index = state.todos.findIndex((todo) => todo.id === task.id);
      state.todos.splice(index, 1);
    },
    updateTodo(state: todoState, task: Task): void {
      const todoToUpdate = state.todos.find((todo) => todo.id === task.id);
      todoToUpdate.isDone = !todoToUpdate.isDone;
    },
  },
  namespaced: true,
  state(): todoState {
    return {
      todos: [
        {
          assignee: 'Célestin',
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
          assignee: 'Titi',
          estimatedTime: '3',
          id: nanoid(),
          isDone: false,
          title: 'Dire bonjour',
        },
      ],
    };
  },
};
