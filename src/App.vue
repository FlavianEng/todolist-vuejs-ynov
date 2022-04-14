<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { routeNames } from './router/index';
import { defineComponent } from 'vue';

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
      <RouterLink
        to="/"
        class="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Title
      </RouterLink>

      <nav class="flex w-full py-2 justify-evenly">
        <RouterLink :to="routeNames.page1" class="font-semibold text-pink-500 hover:text-violet-500"
          >Page 1</RouterLink
        >
      </nav>
    </div>
  </header>

  <main class="p-8">
    <RouterView />
  </main>
</template>
