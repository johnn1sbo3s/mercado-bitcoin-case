<template>
  <button
    class="form-button__content"
    :class="{ 'form-button__content--secondary' : secondary }"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup>

defineProps({
  text: {
    type: String,
    required: true
  },
  secondary: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

function handleClick() {
  emit('click');
}

</script>

<style lang="scss" scoped>

.form-button {
  font-size: 14px;
  padding: var(--spacing-md);
  border-radius: var(--spacing-sm);
  font-weight: bold;
  border: none;
  cursor: pointer;

  &__content {
    @extend .form-button;
    background: var(--color-primary);
    color: white;

    &--secondary {
      @extend .form-button;
      background: var(--color-secondary);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
    }
  }
}

</style>
