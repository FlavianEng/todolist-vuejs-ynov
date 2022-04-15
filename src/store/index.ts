import { createStore } from 'vuex';
import todoStore from '@/store/modules/todo.store';

export default createStore({ modules: { todoStore } });
