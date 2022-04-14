<template>
  <select
    class="py-2 px-4 rounded-lg border-2 border-slate-500 focus:ring-0 focus:outline-none focus:border-violet-500"
    :name="name"
    v-model="value"
    :required="isRequired"
    @change="this.$emit('selectValue', this.value)">
    <option value="" disabled selected>Assigné à</option>
    <option v-for="item in arrayOfData" :key="item.value" :value="item.value">
      {{ item.key }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomSelect',
  props: {
    arrayOfData: Array,
    isRequired: Boolean,
    name: String,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {},
  emits: ['selectValue'],
});
</script>
