<template>content</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExampleItem',
  props: {
    prop: String,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {},
});
</script>
