<template>
  <button
    class="form-button__content"
  >
    Avançar
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.form-button {
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  border: none;

  &__content {
    @extend .form-button;
    background-color: #ff9900;
    color: white;
  }
}

</style>
