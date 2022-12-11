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
  height: 40px;
  background-color: rgb(145, 223, 145);
  color: #333;
  border-radius: 4px;
  min-width: 6rem;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
}

.btn-delete {
  background-color: rgb(241, 112, 89);
}
</style>