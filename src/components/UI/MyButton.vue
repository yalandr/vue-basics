<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
name: 'MyButton'
}
</script>

<style>
.btn {
  height: auto;
  background-color: rgb(145, 223, 145);
  color: #333;
  border-radius: 4px;
  min-width: 5rem;
  padding: 0.2rem .5rem;
  font-weight: 700;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
}

.btn-delete {
  background-color: rgb(241, 112, 89);
}
</style>