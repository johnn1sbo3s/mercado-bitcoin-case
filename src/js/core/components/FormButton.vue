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
  padding: var(--spacing-md);
  border-radius: var(--spacing-sm);
  font-weight: bold;
  border: none;

  &__content {
    @extend .form-button;
    background-color: var(--color-primary);
    color: white;
  }
}

</style>
