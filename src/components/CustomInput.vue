<template>
  <input
    class="py-2 px-4 rounded-lg border-2 border-slate-500 focus:ring-0 focus:outline-none focus:border-violet-500"
    :type="inputType"
    v-model.trim="value"
    :placeholder="placeholder"
    :isRequired="isRequired"
    :min="minValue"
    @keyup="this.$emit('inputValue', this.value)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomInput',
  props: {
    inputType: String,
    isRequired: Boolean,
    minValue: Number,
    placeholder: String,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {},
  emits: ['inputValue'],
});
</script>
