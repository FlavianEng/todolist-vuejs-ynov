<script lang="ts">
import { defineComponent } from 'vue';
import { routeNames } from './router/index';

export default defineComponent({
  data() {
    return {
      routeNames: routeNames,
    };
  },
});
</script>

<template>
  <header class="flex justify-center items-center flex-col pt-8">
    <div>
      <RouterLink to="/" class="text-6xl font-bold text-gradient"> To-do </RouterLink>

      <!-- <nav class="flex w-full py-2 justify-evenly">
        <RouterLink :to="routeNames.page1" class="font-semibold text-pink-500 hover:text-violet-500"
          >Page 1</RouterLink
        >
      </nav> -->
    </div>
  </header>

  <main class="p-8">
    <RouterView />
  </main>
</template>
