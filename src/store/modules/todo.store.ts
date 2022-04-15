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
    removeTodo(state: todoState, taskIndex: number): void {
      state.todos.splice(taskIndex, 1);
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
        {
          assignee: 'Gabin',
          estimatedTime: '120',
          id: nanoid(),
          isDone: false,
          title: 'Easter egg',
        },
      ],
    };
  },
};
