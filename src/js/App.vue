<template>
  <div class="register-form">
    <div class="register-form__header">
      <div class="register-form__step-info">
        <p>Etapa</p>

        <p class="register-form__step-info--active">
          {{ currentStep + 1 }}
        </p>

        <p>de 4</p>
      </div>

      <h2>Seja bem vindo(a)</h2>

      <div class="register-form__step-content">
        <component
          :is="steps[currentStep].component"
          v-model="form"
          @can-advance="handleCanAdvance"
        />
      </div>

      <div class="register-form__buttons">
        <FormButton
          v-if="currentStep !== 0"
          text="Voltar"
          secondary
          @click="handlePreviousClick"
        />

        <FormButton
          text="Avançar"
          :disabled="!canAdvance"
          @click="handleAdvanceClick"
          @disabled-click="handleDisabledClick"
        />
      </div>
      {{ showPreviousButton }}

      <span
        v-if="showErrorMessage"
        class="register-form__error"
      >
        Preencha o formulário corretamente para avançar
      </span>
    </div>
  </div>
  <pre>{{ form }}</pre>
</template>

<script setup>
import { ref } from 'vue';
import StepOne from './features/components/StepOne.vue';
import StepTwo from './features/components/StepTwo.vue';
import FormButton from './core/components/FormButton.vue';

const form = ref({});
const currentStep = ref(0);
const canAdvance = ref(false);
const showErrorMessage = ref(false);

const steps = [
  {
    title: 'Seja bem vindo(a)',
    component: StepOne,
  },
  {
    title: 'Step Two',
    component: StepTwo,
  }
];

function handleDisabledClick() {
  showErrorMessage.value = true;

  setTimeout(() => {
    showErrorMessage.value = false;
  }, 3000);
}

function handlePreviousClick() {
  currentStep.value--;
}

function handleAdvanceClick() {
  currentStep.value++;
  canAdvance.value = false;
}

function handleCanAdvance(value) {
  canAdvance.value = value;
}

</script>

<style lang="scss" scoped>

.register-form {
  margin-top: 20%;
  width: 350px;
  background: white;
  padding: var(--spacing-xxl) var(--spacing-xl);
  border-radius: var(--spacing-md);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__step-info {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-xs);

    &--active {
      color: var(--color-primary);
    }
  }

  &__step-content {
    margin: var(--spacing-xl) 0;
    width: 100%;
    height: 100%;
  }

  &__buttons {
    width: 100%;
    display: flex;
    gap: var(--spacing-md);
  }

  &__error {
    padding: var(--spacing-sm);
    margin-top: var(--spacing-sm);
    background-color: #ffeeee;
    border: 1px solid #ffbbbb;
    border-radius: var(--border-radius-md);
    font-size: 12px;
    color: #d82b2b;
  }
}

</style>
