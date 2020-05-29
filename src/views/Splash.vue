<template>
  <router-link :to="{ name: 'Menu' }" class="flex flex-col justify-center items-center min-h-screen">
    <img class="max-w-6xl w-full px-4" src="../assets/logo.svg">
    <h2 class="text-left text-blue-200 text-4xl font-bold capitalize mt-16">Press anywhere to continue</h2>
  </router-link>
</template>

<script>
export default {
  name: 'Splash'
}
</script>
