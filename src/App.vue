<template>
<div class="app">
  <header class="header">
    <my-navbar></my-navbar>
  </header>
  <router-view>

  </router-view>
</div>
</template>

<script>
import MyNavbar from '@/components/UI/MyNavbar.vue';
export default {
  components: { MyNavbar },
  
}
</script>

<style>

</style>
