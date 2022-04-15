<template>
  <div v-if="isEditing" class="absolute z-10 w-full flex justify-center items-center">
    <div class="z-20 p-8 w-2/3 bg-white rounded-lg">
      <div class="flex justify-between items-baseline">
        <p class="font-semibold mb-12">
          Vous modifiez la tâche :
          <span class="text-gradient">{{ task.title }}</span>
        </p>
        <button
          type="button"
          class="text-sm ml-auto px-4 hover:animate-spin-fast"
          @click.stop="this.$emit('cancelEdit')">
          ✖
        </button>
      </div>
      <div class="flex gap-x-4">
        <custom-input
          class="w-full"
          @inputValue="updateName"
          inputType="text"
          placeholder="Nom de la tâche"
          :isRequired="true" />
        <button class="btn-gradient whitespace-nowrap" type="button" @click="confirmEditTask">
          Modifier la tâche
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="isEditing"
    class="fixed w-full h-full top-0 bottom-0 left-0 right-0 bckg-gradient opacity-50"></div>
</template>

<script lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'EditForm',
  components: { CustomInput },
  props: {
    isEditing: Boolean,
    task: {},
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    confirmEditTask() {
      const newTask = { ...this.task, title: this.value };
      store.commit('todoStore/editTodo', newTask);
      this.$emit('cancelEdit');
    },
    updateName(newValue: string) {
      this.value = newValue;
    },
  },
  emits: ['cancelEdit', 'confirmEditTask'],
});
</script>
