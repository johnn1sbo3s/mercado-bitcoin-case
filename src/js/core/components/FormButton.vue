<template>
  <button
    class="form-button__content"
    :class="computedClass"
    @click.prevent="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  secondary: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click', 'disabled-click']);

const computedClass = computed(() => {
  if (props.secondary) return 'form-button__content--secondary';
  if (props.disabled) return 'form-button__content--disabled';

  return '';
});

function handleClick() {
  if (props.disabled) {
    emit('disabled-click');
    return;
  }

  emit('click');
}

</script>

<style lang="scss" scoped>

.form-button {
  font-size: 14px;
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--spacing-sm);
  font-weight: bold;
  border: none;
  cursor: pointer;

  &__content {
    @extend .form-button;
    background: var(--color-primary);
    color: white;

    &:hover {
      background: var(--color-primary-dark);
      color: white;
    }

    &--secondary {
      @extend .form-button;
      background: white;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }

    &--disabled {
      @extend .form-button__content;
      background: var(--color-primary-light);
      cursor: not-allowed;
    }
  }
}

</style>
