<template>
  <input :value="modelValue" @input="updateInput" class="text-input" />
</template>

<script>
export default {
    name: 'MyInput',
    props: {
        modelValue: [
            String, Number
        ]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
.text-input {
  height: 40px;
  border: 1px solid #999;
  color: #ddd;
  padding: 0 20px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: transparent;
}
</style>