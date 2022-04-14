<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex gap-x-4">
      <custom-input
        @inputValue="updateName"
        inputType="text"
        placeholder="Nom de la tâche"
        :isRequired="true" />
      <custom-input
        @inputValue="updateEstimatedTime"
        inputType="number"
        placeholder="Temps estimé en heure"
        :isRequired="true"
        :minValue="1" />
      <custom-select
        :arrayOfData="persons"
        title="assignee"
        @selectValue="updateAssignee"
        :isRequired="true" />
      <button
        class="py-2 px-4 font-bold text-gradient whitespace-nowrap rounded-lg"
        type="button"
        @click="createTask">
        Ajouter la tâche
      </button>
    </div>
    <p
      class="my-4 text-4xl font-semibold text-pink-500"
      :class="{ invisible: !errorMessage, block: errorMessage }">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import { defineComponent } from 'vue';
import { nanoid } from 'nanoid';

export default defineComponent({
  title: 'TodoForm',
  components: { CustomInput, CustomSelect },
  props: {
    inputType: String,
  },
  data() {
    return {
      assignee: '' as string,
      errorMessage: null as string | null,
      estimatedTime: null as string | null,
      persons: [
        { key: 'Cindy', value: 'Cindy' },
        { key: 'Priscillya', value: 'Priscillya' },
        { key: 'Titi', value: 'Titi' },
        { key: 'Kéké', value: 'Kéké' },
        { key: 'Célestin', value: 'Célestin' },
      ],
      title: '' as string,
    };
  },
  methods: {
    createTask() {
      if (
        !this.assignee ||
        this.assignee.length < 1 ||
        !this.estimatedTime ||
        this.estimatedTime.length < 1 ||
        !this.title ||
        this.title.length < 1
      ) {
        setTimeout(() => (this.errorMessage = null), 5000);
        this.errorMessage = '💣 Veuillez remplir tous les champs !';
        return;
      }

      const newTask = {
        assignee: this.assignee,
        estimatedTime: this.estimatedTime,
        id: nanoid(),
        isDone: false,
        title: this.title,
      };

      this.$emit('taskCreated', newTask);
    },
    updateAssignee(newValue: string) {
      this.assignee = newValue;
    },
    updateEstimatedTime(newValue: string) {
      this.estimatedTime = newValue;
    },
    updateName(newValue: string) {
      this.title = newValue;
    },
  },
  emits: ['inputValue', 'taskCreated'],
});
</script>
