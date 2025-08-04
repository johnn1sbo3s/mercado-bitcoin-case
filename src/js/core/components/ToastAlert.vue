<template>
  <transition name="toast-slide">
    <div
      v-if="model"
      class="toast-alert"
      :class="computedClass"
    >
      <p class="toast-alert__text">
        {{ computedText }}
      </p>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';

const model = defineModel({
  type: Boolean,
  required: true,
});

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error'].includes(value),
  },
});

const computedClass = computed(() => {
  if (props.type === 'success') return 'toast-alert__status--success';

  return 'toast-alert__status--error';
});

const computedText = computed(() => {
  return props.type === 'success'
    ? 'Cadastro realizado com sucesso!'
    : 'Erro ao realizar o cadastro. Tente novamente.';
});

</script>

<style lang="scss" scoped>

.toast-alert {
  position: fixed;
  top: 24px;
  right: 0;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
  background-color: white;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &__status {

    &--success {
      border: 1px solid #ddffe1;
      color: var(--color-success);
    }

    &--error {
      border: 1px solid #ffdddd;
      color: var(--color-error);
    }
  }

  &__text {
    font-size: 13px;
    font-weight: 550;
  }
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.toast-slide-enter-to,
.toast-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .toast-alert {
    border-radius: var(--border-radius-md);
    width: 80%;
    right: 4%;
    top: auto;
    bottom: 40px;
  }

  .toast-slide-enter-from,

  .toast-slide-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .toast-slide-enter-to,

  .toast-slide-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
