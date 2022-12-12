<template>
  <section class="post-details">
    <div class="container">
        Post # {{ $route.params.id }}
        <h3>
            {{$route.params}}
        </h3>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>