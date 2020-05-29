<template>
  <div id="app" class="min-h-screen overflow-hidden">
    <video autoplay muted loop class="fixed bg-cover bottom-0 right-0 min-w-full min-h-full object-fill -z-1">
      <source src="./assets/stars.mp4" type="video/mp4">
    </video>

    <router-view />
  </div>
</template>
