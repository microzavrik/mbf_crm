<script setup>
  import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div class="view">
    <RouterView/>
  </div>
  <div class="buttons">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>

<style scoped>

</style>

